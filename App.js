function App(){
    const keyPad=[{
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  }, {
      keyCode: 87,
      keyTrigger: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  }, {
      keyCode: 69,
      keyTrigger: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  }, {
      keyCode: 65,
      keyTrigger: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  }, {
      keyCode: 83,
      keyTrigger: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  }, {
      keyCode: 68,
      keyTrigger: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  }, {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  }, {
      keyCode: 88,
      keyTrigger: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  }, {
      keyCode: 67,
      keyTrigger: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }]
    
  const[recording,setRecording]=React.useState('');
  const[volume,setVolume]=React.useState(1);
  
  const playRecording=()=>{
    let keyArray=recording.split(" ");
    let index=0;
    const interval=setInterval(()=>{
      const audioTag=document.getElementById(keyArray[index])
      audioTag.currentTime=0;
      audioTag.volume=volume;
      audioTag.play();
      index++;
      },300);
      setTimeout(()=>clearInterval(interval),300*keyArray.length-1)
    }
      return (
        <div id="drum-machine">
         <div>
          {keyPad.map((clip)=>(
            <Pad key={clip.id} clip={clip} setRecording={setRecording} volume={volume} />
          ))}
         </div>
         <h2>recording</h2>
         <div id="display">{recording}</div>
         <button className="btn btn-warning m-3" onClick={playRecording}>Play</button>
         <button className="btn btn-danger" onClick={()=>setRecording('')}>Cancel</button>
         <br />
         <input 
         type="range"
         step="0.01"
         min="0"
         max="1"
         value={volume}
         onChange={(e)=>setVolume(e.target.value)}
         className="w-30 m-5" />
        </div>
      
      )
    }
  
    function Pad({clip,setRecording,volume}){
  
    const[active,setActive]=React.useState(false);
  
      const keyHandler=(e)=>{
        if(e.keyCode===clip.keyCode){
          playSound();
        }
      }
  
  
      React.useEffect(()=>{
        document.addEventListener("keydown",keyHandler)
        return()=>{
          document.removeEventListener("keydown",keyHandler)
        }
        
      },[])
      
    
  
      const playSound=()=>{
        const audioTag=document.getElementById(clip.keyTrigger);
        audioTag.play();
        setTimeout(()=>setActive(false),200)
        audioTag.currentTime=0;
        setRecording(pre=>pre+clip.keyTrigger+" ");
        setActive(true);
        audioTag.volume=volume;
      }
      return(
      <div className={`btn drum-pad ${active&& "btn-warning"}`} onClick={playSound}>
       <audio className="clip" id={clip.keyTrigger} src={clip.url} />
       {clip.keyTrigger}
      </div>
   )
    }
    
    ReactDOM.render(<App/>,document.getElementById("app"))