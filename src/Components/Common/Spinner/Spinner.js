import React from 'react';

const LoadingHOC = (WrappedState) => {
    return class LoadingHOC extends React.PureComponent {
        render() {
            return (
                this.props.data == null || this.props.data.length === 0 ? <div><i className="fa fa-spinner fa-spin fa-5x fa-fw"></i></div> : <WrappedState {...this.props} />
            )
        }
    }
}

export default LoadingHOC;