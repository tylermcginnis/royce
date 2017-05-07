import React, { Component } from 'react'
import SimpleWebRTC from 'simplewebrtc'

class App extends Component {
  state = {
    talking: false,
  }
  componentDidMount() {
    this.webrtc = new SimpleWebRTC({
      localVideoEl: this.refs.local,
      remoteVideosEl: this.refs.remotes,
      autoRequestMedia: true,
    })
    this.webrtc.once('readyToCall', () => this.webrtc.joinRoom(this.props.room))
    document.addEventListener('keydown', this.unmute)
    document.addEventListener('keyup', this.mute)
  }

  componentWillUnmount() {
    this.webrtc.leaveRoom()
    document.removeEventListener('keydown', this.toggleTalking)
  }

  mute = () => {
    this.setState({
      talking: false,
    })
  }
  unmute = () => {
    this.setState({
      talking: true,
    })
  }
  render() {
    return (
      <div
        className="conference"
        onKeyDown={this.toggleTalking}
        onKeyUp={this.toggleTalking}
      >
        <div>
          {this.state.talking && 'TALKING'}
          <video ref="local" className="local" />
          <div ref="remotes" className="remotes" />
        </div>
      </div>
    )
  }
}

export default App
