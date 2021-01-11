import React from 'react';
/**
 * Holds the additional data shown onclick
 *
 * @author Bradley Slater
 */
class AuthorData extends React.Component {

    state = {
        data:this.props.data
    }


    render(){
        return(
            <div className="AuthorData"><p>Title: {this.state.data.title}</p><p>Abstract: {this.state.data.abstract}</p><p>Award: {this.state.data.award ===""?"none":this.state.data.award}</p></div>
        );
    }


}
export default AuthorData;