import { Button,Input } from 'antd';
import {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import GlobalStyle from "./utils/GlobalStyle";
import {formatUnit} from "@ckb-lumos/bi";

const Box = styled.div`
    margin: 40px 100px ;
    ul{
        display: flex;
        flex-direction: column;
        li{
            display: flex;
            align-content: center;
            gap: 20px;
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
            line-height: 40px;
            &.noFlex{
                flex-direction: column;
             
            }
        }
    }
    .flex{
        display: flex;
        align-items: center;
        gap: 10px;
        span{
            flex-shrink: 0;
            min-width: 100px;
            background: #f2f2f2;
            text-align: center;
        }
        
    }
    .sig{
        width: 60%;
        word-break: break-all;
        line-height: 1em;
    }
`
function App() {

    const [address,setAddress] = useState('')
    const [balance,setBalance] = useState("-");
    const [message,setMessage] = useState("");
    const [signature,setSignature] =useState('');
    const [sendTo,setSendTo] =useState('ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqf5kmkgn25z8xajscwkw88ew3hagjfd5uqttnscm');
    const [amount,setAmount] =useState('100');
    const [txHash,setTxhash] = useState('')
    const [network,setNetwork] = useState('')
    const [feeRate,setFeeRate] = useState(null)

    const  accountChangesFun =  useCallback((data) => {
        console.log("==accountsChanged==",data)
    },[])

    useEffect(()=>{

        window.ckb.on('accountsChanged', accountChangesFun);
        window.ckb.on('chainChanged', function (data) {
            console.log("==chainChanged==",data)
        });

    },[])

    const connect = async() =>{
        try{
            let addr =  await window.ckb.request({method:"ckb_requestAccounts"})
            setAddress(addr)
        }catch (e) {
            console.error("==connect=",e)
        }

    }
    const getBalance = async () =>{
        try{

            let rt =  await window.ckb.request({method:"ckb_getCapacity",data:[address]})
            let formatRt = formatUnit(rt,"ckb")
            setBalance(formatRt)
        }catch (e) {
            console.error("==getBalance=",e)
        }
    }

    const testSign = async() =>{
        try{
            let rt = await window.ckb.request({method:"ckb_signMessage",data:{message}})
            console.log("======",rt)
            setSignature(rt);
        }catch (e) {
            console.error("==signMessage=",e)
        }

    }

    const handleSend = async() =>{
        try{
            let rt = await window.ckb.request({method:"ckb_sendCKB",data:{
                    amount,
                    to:sendTo
                }})

            setTxhash(rt);
        }catch (e) {
            console.error("==ckb_sendCKB=",e)
        }
    }

    const handleInput = (e) =>{
        const {value,name} = e.target;
        switch (name){
            case "message":
                setMessage(value)
                break;
            case "sendTo":
                setSendTo(value)
                break;
            case "amount":
                setAmount(value)
                break;
        }
    }

    const getNetwork = async() =>{
        try{
            let rt = await window.ckb.request({method:"ckb_getNetwork"})
            setNetwork(rt);
        }catch (e) {
            console.error("==ckb_sendCKB=",e)
        }
    }
    const switchNetwork = async() =>{
        let data = network === "mainnet"?'testnet':"mainnet"
        try{
            let rt = await window.ckb.request({method:"ckb_switchNetwork",data})
            console.log(rt)
        }catch (e) {
            console.error("==ckb_sendCKB=",e)
        }
    }

    const getFeeRate = async() =>{
        try{
            let rt = await window.ckb.request({method:"ckb_getFeeRate"})
            setFeeRate(rt)
        }catch (e) {
            console.error("==ckb_sendCKB=",e)
        }
    }

    const getConnected = async() =>{
        try{
            let rt = await window.ckb.isConnected()
            console.log(rt)

        }catch (e) {
            console.error("==ckb_sendCKB=",e)
        }
    }

    const offAccount = () =>{
        try{
           window.ckb.off('accountsChanged', accountChangesFun)
            console.log("---offAccount---")

        }catch (e) {
            console.error("==ckb_sendCKB=",e)
        }
    }

  return (
    <Box>
        <ul>
            <li>
                <div>
                    <Button type="primary" onClick={() => connect()}>connect wallet</Button>
                </div>

                <div>{address}</div>
            </li>
            <li>
                <div>
                    <Button type="primary" onClick={() => getBalance()}>get balance</Button>
                </div>

                <div>{balance} CKB</div>
            </li>


            <li>
                <div>
                    <Input type="text" name="message" value={message} onChange={(e) => handleInput(e)}/>
                </div>
                <div>
                    <Button type="primary" onClick={() => testSign()}>sign message</Button>
                </div>
                <div className="sig">{signature}</div>
            </li>

            <li className="noFlex">
                <div>
                    <div className="flex"><span>Transfer To</span><Input value={sendTo} name="sendTo"
                                                                         onChange={(e) => handleInput(e)}/></div>

                </div>
                <div>
                    <div className="flex"><span>Amount</span><Input value={amount} name="amount"
                                                                    onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>{txHash}</div>
                <div>
                    <Button type="primary" onClick={() => handleSend()}>Transaction</Button>
                </div>
            </li>

            <li>
                <div>
                    <Button type="primary" onClick={() => getNetwork()}>get Network</Button>
                </div>

                <div>{network}</div>
            </li>
            <li>
                <div>
                    <Button type="primary" onClick={() => switchNetwork()}>switch Network</Button>
                </div>
            </li>
            <li>
                <div>
                    <Button type="primary" onClick={() => getFeeRate()}>Fee rate</Button>
                </div>
                <div>
                    <span>mean:{feeRate?.mean ?? 0}</span> --
                    <span>median:{feeRate?.median ??0 }</span>
                </div>
            </li>
            <li>
                <div>
                    <Button type="primary" onClick={() => getConnected()}>IsConnected</Button>
                </div>
            </li>
            <li>
                <div>
                    <Button type="primary" onClick={() => offAccount()}>Off </Button>
                </div>
            </li>

        </ul>

        <GlobalStyle/>
    </Box>
  )
}

export default App
