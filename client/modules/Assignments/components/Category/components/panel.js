class Panel extends React.Component {
/*
Props available: 
- panelCustomClass 
- header and headerCustomClass
- body and bodyCustomClass
- footer and footerCustomClass

You can add PropType.isRequired as you wish.
*/
  render(){
    return (
      <div className={["panel", this.props.panelCustomClass].join(' ') || "panel panel-default"} onClick={this.props.action}>
        {this.props.header &&
          <div className={this.props.headerCustomClass || "panel-heading"}>{ this.props.header }</div>
        }
        {this.props.body &&
          <div className={this.props.bodyCustomClass || "panel-body"}>{ this.props.body }</div>
        }
        {this.props.footer &&
          <div className={this.props.footerCustomClass || "panel-footer"}>{ this.props.footer }</div>
        }
      </div>
    );
  }
}
