import React from 'react'

export class LabelH2 extends React.Component{
  render() {
    return (
      <h2 className={this.props.classes}>
        {this.props.text}
      </h2>
    )
  }
}

export class LabelH4 extends React.Component{
  render() {
    return (
      <h4>
        {this.props.text}
      </h4>
    )
  }
}

export class MeetMarker extends React.Component{
  render() {
    return (
      <div className='meet-marker'>
      </div>
    )
  }
}
