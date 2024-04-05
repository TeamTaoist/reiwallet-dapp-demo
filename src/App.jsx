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
            min-width: 150px;
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

const BalanceBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    .tit{
        margin-right: 10px;
    }
`
function App() {

    const [address,setAddress] = useState('')
    const [balance,setBalance] = useState(null);
    const [message,setMessage] = useState("");
    const [signature,setSignature] =useState('');
    const [sendTo,setSendTo] =useState('ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqf5kmkgn25z8xajscwkw88ew3hagjfd5uqttnscm');
    const [amount,setAmount] =useState('100');
    const [txHash,setTxhash] = useState('')
    const [network,setNetwork] = useState('')
    const [feeRate,setFeeRate] = useState(null)
    const [txIndex,setTxIndex] = useState('')
    const [txDobHash,setTxDobHash] = useState('')
    const [DobHash,setDobHash] = useState('')
    const [sendDOBTo,setSendDOBTo] =useState('ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqf5kmkgn25z8xajscwkw88ew3hagjfd5uqttnscm');

    const [sendClusterTo,setSendClusterTo] =useState('ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqf5kmkgn25z8xajscwkw88ew3hagjfd5uqttnscm');
    const [ClusterIndex,setClusterIndex] = useState('')
    const [ClusterHash,setClusterHash] = useState('')
    const [ClusterTx,setClusterTx] = useState('')

    const [sendToSUDT,setSendToSUDT] =useState('ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqf5kmkgn25z8xajscwkw88ew3hagjfd5uqttnscm');
    const [SUDTamount,setSUDTAmount] =useState('100');
    const [SUDTHash,setSUDThash] = useState('')
    const [token,setToken] = useState('')

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
    const getCapacity = async () =>{
        try{

            let rt =  await window.ckb.request({method:"ckb_getCapacity",data:[address]})
            const {capacity,occupied} = rt;
            setBalance({
                capacity:formatUnit(capacity,"ckb"),
                occupied:formatUnit(occupied,"ckb")
            })
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
            case "txIndex":
                setTxIndex(value)
                break;
            case "txDobHash":
                setTxDobHash(value)
                break;
            case "sendDOBTo":
                setSendDOBTo(value)
                break;
            case "sendClusterTo":
                setSendClusterTo(value)
                break;
            case "ClusterIndex":
                setClusterIndex(value)
                break;
            case "ClusterHash":
                setClusterHash(value)
                break;
            case "sendToSUDT":
                setSendToSUDT(value)
                break;
            case "SUDTamount":
                setSUDTAmount(value)
                break;
            case "token":
                setToken(value)
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
            await getNetwork()
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

    const handleSendDob = async() =>{
        try{
            let rt = await window.ckb.request({method:"ckb_sendDOB",data:{
                    outPoint:{
                        index:txIndex,
                        txHash:txDobHash
                    },
                    to:sendDOBTo
                }})

            setDobHash(rt);
        }catch (e) {
            console.error("==ckb_sendDOB=",e)
        }
    }

const handleCluster= async() =>{
        try{
            let rt = await window.ckb.request({method:"ckb_sendCluster",data:{
                    outPoint:{
                        index:ClusterIndex,
                        txHash:ClusterHash
                    },
                    to:sendClusterTo
                }})

            setClusterTx(rt);
        }catch (e) {
            console.error("==ckb_sendCluster=",e)
        }
    }

    const handleSendSUDT = async() =>{
        try{
            let rt = await window.ckb.request({method:"ckb_sendSUDT",data:{
                    amount:SUDTamount,
                    to:sendToSUDT,
                    token
                }})

            setSUDThash(rt);
        }catch (e) {
            console.error("==ckb_sendCluster=",e)
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
                    <Button type="primary" onClick={() => getCapacity()}>get Capacity</Button>
                </div>

                <BalanceBox>
                    <div>
                        <span className="tit">Capacity</span>
                        <span>{balance?.capacity ? balance?.capacity : "--"} CKB</span>
                    </div>
                    <div>
                        <span className="tit">Occupied</span>
                        <span>{balance?.occupied ? balance?.occupied : "--"} CKB</span>
                    </div>

                </BalanceBox>
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
                    <Button type="primary" onClick={() => handleSend()}>Send CKB</Button>
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
                    <span>median:{feeRate?.median ?? 0}</span>
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

            <li className="noFlex">
                <div>
                    <div className="flex"><span>Transfer To</span><Input value={sendDOBTo} name="sendDOBTo"
                                                                         onChange={(e) => handleInput(e)}/></div>

                </div>
                <div>
                    <div className="flex"><span>Index (OutPoint)</span><Input value={txIndex} name="txIndex"
                                                                              onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>
                    <div className="flex"><span>TxHash (OutPoint)</span><Input value={txDobHash} name="txDobHash"
                                                                               onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>{DobHash}</div>
                <div>
                    <Button type="primary" onClick={() => handleSendDob()}>Send DOB</Button>
                </div>
            </li>

            <li className="noFlex">
                <div>
                    <div className="flex"><span>Transfer To</span><Input value={sendClusterTo} name="sendClusterTo"
                                                                         onChange={(e) => handleInput(e)}/></div>

                </div>
                <div>
                    <div className="flex"><span>Index (OutPoint)</span><Input value={ClusterIndex} name="ClusterIndex"
                                                                              onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>
                    <div className="flex"><span>TxHash (OutPoint)</span><Input value={ClusterHash} name="ClusterHash"
                                                                               onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>{ClusterTx}</div>
                <div>
                    <Button type="primary" onClick={() => handleCluster()}>Send Cluster</Button>
                </div>
            </li>

            <li className="noFlex">
                <div>
                    <div className="flex"><span>Transfer To</span><Input value={sendToSUDT} name="sendToSUDT"
                                                                         onChange={(e) => handleInput(e)}/></div>

                </div>
                <div>
                    <div className="flex"><span>Amount</span><Input value={SUDTamount} name="SUDTamount"
                                                                    onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>
                    <div className="flex"><span>Token</span><Input value={token} name="token"
                                                                    onChange={(e) => handleInput(e)}/></div>
                </div>
                <div>{SUDTHash}</div>
                <div>
                    <Button type="primary" onClick={() => handleSendSUDT()}>Send SUDT</Button>
                </div>
            </li>

        </ul>

        <GlobalStyle/>
    </Box>
  )
}

export default App
