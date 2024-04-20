import './styles.css';

function Photo_Input(props){
    return (
        <div className = 'main-input'>
            <div style={{padding:"10px"}}> Input Your Spot</div>
            <button className = 'close-button' onClick = {props.close}>X</button>
            <input type="file" accept="image/*"/>
        </div>
    )
}

export default Photo_Input;