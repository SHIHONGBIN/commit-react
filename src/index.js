import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
class InputDom extends Component{
    constructor(){
        super()
        this.state = {
            username:'',
            commit:'',
            time:''
        }
    }
    submitCommit(e){
            if(this.props.onSubmitFn){
                this.props.onSubmitFn({
                    username: this.input.value,
                    commit: this.textarea.value,
                    time: new Date().getTime()
                })
            }
            window.localStorage.setItem('username', this.input.value)
    }
    componentDidMount(){
        this.input.focus();
    }
    componentWillMount(){
        var username = window.localStorage.username||''
        if(username){
            this.setState({
                username: username
            })
        }
    }
    render(){
        return(
            <div className='inputBox'>
                <div className='input-row'><span>姓名：</span><input type='text' defaultValue={this.state.username}  ref={(input)=>{this.input = input}}/></div>
                <div className='input-row'><span>留言：</span><textarea defaultValue={this.state.commit} ref={(textarea)=>this.textarea = textarea}/></div>
                <div className='submit-btn'><button onClick={this.submitCommit.bind(this)}>提交</button></div>
            </div>
        )
    }
}

class ListDom extends Component{
    static defaultProps = {
        username: 0,
        commit: 0,
        time:0
    }
    constructor(){
        super()
        this.state = {
            time: ''
        }
    }
    componentDidMount(){
        console.log(1)
        this.setState({
            time:(new Date().getTime() - this.props.data.time)/1000
        })
    }
    render(){
        return(
            <div className='listBox'>
                <ul>
                    <li><span>{this.props.data.username}:</span><p>{this.props.data.commit}</p>
                    <div>{this.state.time}</div>
                    <p className='button'> 删除</p>
                    </li>
                </ul>
            </div>
        )
    }
}


class Commit extends Component{
    constructor(){
        super()
        this.state={
            data:[]
        }
    }
    componentWillMount(){
        if(window.localStorage.getItem('list')){
        var localStorageData = JSON.parse(window.localStorage.getItem('list'));
        this.setState({
            data: localStorageData
        })
        this.time = setInterval(()=>{
            if(window.localStorage.getItem('list')){
                console.log(11)
                var localStorageData = JSON.parse(window.localStorage.getItem('list'));
                this.setState({
                    data: []
                })
                this.setState({
                    data: localStorageData
                })
            } 
        },5000)
    }
    }
    getProps(data){
        var datarr = this.state.data
        datarr.push(data)
        this.setState({
            data:datarr
        }, function(){
            window.localStorage.setItem('list', JSON.stringify(datarr))
        })
    }
    render(){
        return(
            <div>
                <InputDom  onSubmitFn = {this.getProps.bind(this)} />
                {this.state.data.map((item,index)=><ListDom data = {item} key={index} />)}
            </div>
        )
    }
}


ReactDOM.render(<Commit />, document.getElementById('root'));
