import { createContext, useState } from "react";
import run from "../config/gimini";
export const Context =createContext();

const ContextProvider =(props)=> {
    const[input,setInput]=useState("");
    const[recentPrompt,setrecentPrompt]=useState("")
    const [prevPrompt,setPrevPrompt]=useState([]);
    const[showResult,setShowresult]=useState(false);
    const[resultData,setResultData]=useState("");
    
  const delayPara=(index,nextWord)=>{
     setTimeout(function(){
       setResultData(prev=>prev+nextWord);
     },75*index)
  }

  const newChat=()=>{
    setShowresult(false)
  }

   const onSent=async(prompt)=>{
    setResultData("")
    setShowresult(true)
    let res;
    if(prompt !== undefined)
    {
      res= await run(prompt);
      setrecentPrompt(prompt)
    }
    else{
      setPrevPrompt(prev=>[...prev,input])
      setrecentPrompt(input)
      res=await run(input)
    }
    let responseArray=res.split("**")
    let newResponse="" ;
    for(let i=0;i<responseArray.length;i++)
    {
      if(i===0 || i%2!==1 ){
        newResponse+=responseArray[i];
      }
      else{
        newResponse+="<b>"+responseArray[i]+"</b>";
      }
    }
    let newResponse2=newResponse.split("*").join("<br>")
    let newRes=newResponse2.split(" ");
    for(let i=0;i<newRes.length;i++)
    {
      const nextWord =newRes[i];
      delayPara(i,nextWord+" ")
    }
    setResultData(newResponse2)
    setInput("")

   }

  const contextValue= {
      prevPrompt,
      setPrevPrompt,
      onSent,
      setrecentPrompt,
      recentPrompt,
      showResult,
      resultData,
      input,
      setInput,
      newChat
  }
  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextProvider