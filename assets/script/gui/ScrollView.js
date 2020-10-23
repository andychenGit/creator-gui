
//重写scrollView函数
//在制作下拉自动更新的时候发现少量的item时ScrollView不能滑动，所有做了部分修改
let ScrollView = cc.Class({
    extends: cc.ScrollView,

    _onTouchMoved (event, captureListeners) {
        log.d("===_onTouchMoved=====")
        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;

        let touch = event.touch;
        if (this.content) {
            this._handleMoveLogic(touch);
        }
        // Do not prevent touch events in inner nodes
        if (!this.cancelInnerEvents) {
            return;
        }

        log.d("===_onTouchMoved1=====")
        let deltaMove = touch.getLocation().sub(touch.getStartLocation());
        //FIXME: touch move delta should be calculated by DPI.
        if (deltaMove.mag() > 7) {
            if (!this._touchMoved && event.target !== this.node) {
                // Simulate touch cancel for target node
                let cancelEvent = new cc.Event.EventTouch(event.getTouches(), event.bubbles);
                cancelEvent.type = cc.Node.EventType.TOUCH_CANCEL;
                cancelEvent.touch = event.touch;
                cancelEvent.simulate = true;
                event.target.dispatchEvent(cancelEvent);
                this._touchMoved = true;
            }
        }
        this._stopPropagationIfTargetIsMe(event);
        log.d("===_onTouchMoved3=====")
    },

    _onTouchEnded (event, captureListeners) {
        log.d("=========_onTouchEnded========")

        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;

        this._dispatchEvent('touch-up');

        let touch = event.touch;
        if (this.content) {
            this._handleReleaseLogic(touch);

            if (this.elastic) {
                let deltaMove = cc.v2(0,0)
                let contentSize = this.content.getContentSize();
                let scrollViewSize = this._view.getContentSize();
                if (contentSize.width < scrollViewSize.width || contentSize.height < scrollViewSize.height) {
                    if (contentSize.width < scrollViewSize.width) {
                        deltaMove.x = -this.content.x;
                    }
                    
                    if (contentSize.height < scrollViewSize.height) {
                        deltaMove.y = scrollViewSize.height - contentSize.height - this.content.y;
                    }
                    this._startAutoScroll(deltaMove, 1.0, true); 
                }
            }
            
        }
        if (this._touchMoved) {
            event.stopPropagation();
        } else {
            this._stopPropagationIfTargetIsMe(event);
        }
    },

    _onTouchCancelled (event, captureListeners) {
        log.d("==_onTouchCancelled==")

        if (!this.enabledInHierarchy) return;
        if (this._hasNestedViewGroup(event, captureListeners)) return;

        // Filte touch cancel event send from self
        
        if (!event.simulate) {
            let touch = event.touch;
            if(this.content){
                this._handleReleaseLogic(touch);

                if (this.elastic) {
                    let deltaMove = cc.v2(0,0)
                    let contentSize = this.content.getContentSize();
                    let scrollViewSize = this._view.getContentSize();
                    if (contentSize.width < scrollViewSize.width || contentSize.height < scrollViewSize.height) {
                        if (contentSize.width < scrollViewSize.width) {
                            deltaMove.x = -this.content.x;
                        }
                        
                        if (contentSize.height < scrollViewSize.height) {
                            deltaMove.y = scrollViewSize.height - contentSize.height - this.content.y;
                        }
                        this._startAutoScroll(deltaMove, 1.0, true); 
                    }
                }
            }
        }
        this._stopPropagationIfTargetIsMe(event);
        log.d("=========_onTouchCancelled========")
    },

     _scrollChildren (deltaMove) {
        if (!this.elastic) {
            deltaMove = this._clampDelta(deltaMove);
        }
        let realMove = deltaMove;
        let outOfBoundary;
        if (this.elastic) {
            outOfBoundary = this._getHowMuchOutOfBoundary();
            realMove.x *= (outOfBoundary.x === 0 ? 1 : 0.5);
            realMove.y *= (outOfBoundary.y === 0 ? 1 : 0.5);
        }

        if (!this.elastic) {
            outOfBoundary = this._getHowMuchOutOfBoundary(realMove);
            realMove = realMove.add(outOfBoundary);
        }

        let scrollEventType = -1;

        if (realMove.y > 0) { //up
            let icBottomPos = this.content.y - this.content.anchorY * this.content.height;

            if (icBottomPos + realMove.y >= this._bottomBoundary) {
                scrollEventType = 'scroll-to-bottom';
            }
        }
        else if (realMove.y < 0) { //down
            let icTopPos = this.content.y - this.content.anchorY * this.content.height + this.content.height;

            if (icTopPos + realMove.y <= this._topBoundary) {
                scrollEventType = 'scroll-to-top';
            }
        }
        if (realMove.x < 0) { //left
            let icRightPos = this.content.x - this.content.anchorX * this.content.width + this.content.width;
            if (icRightPos + realMove.x <= this._rightBoundary) {
                scrollEventType = 'scroll-to-right';
            }
        }
        else if (realMove.x > 0) { //right
            let icLeftPos = this.content.x - this.content.anchorX * this.content.width;
            if (icLeftPos + realMove.x >= this._leftBoundary) {
                scrollEventType = 'scroll-to-left';
            }
        }
        this._moveContent(realMove, false);

        if (realMove.x !== 0 || realMove.y !== 0) {
            if (!this._scrolling) {
                this._scrolling = true;
                this._dispatchEvent('scroll-began');
            }
            this._dispatchEvent('scrolling');
        }

        if (scrollEventType !== -1) {
            this._dispatchEvent(scrollEventType);
        }
    },

    //重写scrollView函数
    _processAutoScrolling (dt) {
        let quintEaseOut = (time)=> {
            time -= 1;
            return (time * time * time * time * time + 1);
        }
        var EPSILON = 1e-4;
        var OUT_OF_BOUNDARY_BREAKING_FACTOR = 0.05;
        let isAutoScrollBrake = this._isNecessaryAutoScrollBrake();
        let brakingFactor = isAutoScrollBrake ? OUT_OF_BOUNDARY_BREAKING_FACTOR : 1;
        this._autoScrollAccumulatedTime += dt * (1 / brakingFactor);

        let percentage = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);
        if (this._autoScrollAttenuate) {
            percentage = quintEaseOut(percentage);
        }

        let newPosition = this._autoScrollStartPosition.add(this._autoScrollTargetDelta.mul(percentage));
        let reachedEnd = Math.abs(percentage - 1) <= EPSILON;

        let fireEvent = Math.abs(percentage - 1) <= this.getScrollEndedEventTiming();
        if (fireEvent && !this._isScrollEndedWithThresholdEventFired) {
            this._dispatchEvent('scroll-ended-with-threshold');
            this._isScrollEndedWithThresholdEventFired = true;
        }

        if (this.elastic) {
            let brakeOffsetPosition = newPosition.sub(this._autoScrollBrakingStartPosition);
            if (isAutoScrollBrake) {
                brakeOffsetPosition = brakeOffsetPosition.mul(brakingFactor);
            }
            newPosition = this._autoScrollBrakingStartPosition.add(brakeOffsetPosition);
        } else {
            let moveDelta = newPosition.sub(this.getContentPosition());
            let outOfBoundary = this._getHowMuchOutOfBoundary(moveDelta);
            if (!outOfBoundary.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
                newPosition = newPosition.add(outOfBoundary);
                reachedEnd = true;
            }
        }

        if (reachedEnd) {
            this._autoScrolling = false;
        }

        let deltaMove = newPosition.sub(this.getContentPosition());
        this._moveContent(deltaMove, reachedEnd); // this._moveContent(this._clampDelta(deltaMove), reachedEnd);源代码更改
        
        this._dispatchEvent('scrolling');

        // scollTo API controll move
        if (!this._autoScrolling) {
            this._isBouncing = false;
            this._scrolling = false;
            this._dispatchEvent('scroll-ended');
        }
    },


});


module.exports = ScrollView;
