import React from 'react';

const LoadingHOC = (WrappedState) => {
    return class LoadingHOC extends React.PureComponent {
        render() {
            return (
                this.props.data == null || this.props.data.length === 0 ? <div className="no-grid-data">No Data Available</div> : <WrappedState {...this.props} />
            )
        }
    }
}

export default LoadingHOC;