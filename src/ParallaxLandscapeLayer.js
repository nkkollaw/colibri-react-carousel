import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';

class ParallaxLandscapeLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posx: parseFloat(this.props.x),
      repeat: true,
    };

    if (this.props.move !== false)
      setInterval(() => {
        if (this.state.posx > this.props.width){
          this.setState({posx: 0, repeat: this.props.loop})
        }
        if (this.state.posx < 0){
          this.setState({posx: this.props.width, repeat: this.props.loop})
        }
        if (this.props.move === 'right' && this.state.repeat === true){
          this.setState(previousState => {
            return { posx: previousState.posx + parseFloat(this.props.speed) };
          });
        }
        if (this.props.move === 'left' && this.state.repeat === true ){
          this.setState(previousState => {
            return { posx: previousState.posx - parseFloat(this.props.speed) };
          });
        }

      }, 50);
  }

  render() {
    return (
      <div>
        <Motion style={{x: spring(this.props.stage*this.props.scrollX,{stiffness: 60, damping: 15,})}}>
          {({x}) =>
            <div className={this.props.layerName} style={{
              position: 'absolute',
              background: 'url('+this.props.img+') ',
              backgroundRepeat: this.props.backgroundRepeat,
              width: this.props.width,
              height: this.props.height,
              zIndex: this.props.level*(-10),
              top: this.props.y,
              left: this.state.posx,
              WebkitTransform: `translateX(${-x/this.props.level}px)`,
              transform: `translateX(${-x/this.props.level}px)`,

            }}/>
          }
        </Motion>

      </div>
    );
  }
}

export default ParallaxLandscapeLayer;