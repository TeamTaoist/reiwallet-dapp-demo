import { Button } from 'antd';
import {useState} from "react";
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
            padding-bottom: 10px;
            line-height: 40px;
        }
    }
`
function App() {

    const [address,setAddress] = useState('')
    const [balance,setBalance] = useState(0)
    const connect = async() =>{
        try{
            let addr =  await window.ckb.request({method:"ckb_requestAccounts"})
            setAddress(addr)
        }catch (e) {
            console.error("==connect,error=",e)
        }

    }
    const getBalance = async () =>{
        console.log(address)
        try{

            let rt =  await window.ckb.request({method:"ckb_getBalance",data:[address]})
            let formatRt = formatUnit(rt,"ckb")
            setBalance(formatRt)
        }catch (e) {
            console.error("==connect,error=",e)
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
            {
                !!address && <li>
                    <div>
                        <Button type="primary" onClick={() => getBalance()}>get balance</Button>
                    </div>

                    <div>{balance} CKB</div>
                </li>

            }


        </ul>

        <GlobalStyle/>
    </Box>
  )
}

export default App
