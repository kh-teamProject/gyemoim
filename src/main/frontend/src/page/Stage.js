import {useEffect,useState} from "react";
import axios from "axios";
import ErrorModal from "../component/UI/ErrorModal";

const Stage = () => {
    const [error, setError] = useState();
    const [stage, setStage] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const modalHandler = () => {
        setError('Modal');
    };

    const errorHandler = () => {
        setError(null);
    };
    // const [payment, setPayment] = useState();
    const H1 = () => {
        return (
            <h1>스테이지 조회</h1>
        );
    };
    useEffect(() =>{
        if(isClicked){
            axios.get('/stage', {})
                .then((res) => {
                    setStage(res.data);
                    // setPayment(res.data);
                    // setDeposit(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    },[isClicked]);
    const handleButtonClick = (event) =>{
        console.log(event.target.value)
        if(event.target.value==='전체'){
            setIsClicked(!isClicked);
        }
        else if(event.target.value==='250'){
            console.log(250);
        }
        else if(event.target.value==='350'){
            console.log(350);
        }
        else if(event.target.value==='500'){
            console.log(500);
        }
        else if(event.target.value==='700'){
            console.log(700);
        }

    };
    const stageHandler = (event) => {
        const arr = [
                {
                    약정금: '250', 월납입액: '50'
                },
                {
                    약정금: '350', 월납입액: '50'
                },
                {
                    약정금: '500', 월납입액: '100'
                },
                {
                    약정금: '700', 월납입액: '100'
                }
            ]
            for (let i = 0; i < arr.length; i++){
                if (arr[i].약정금 == event.target.value){
                    // setDeposit(arr[i].약정금);
                    // setPayment(arr[i].월납입액);
                }
            }
        };
    return (
        <>
            <H1/>
            <button onClick={handleButtonClick} value='전체'>전체</button>
            <button onClick={handleButtonClick} value='250'>250</button>
            <button onClick={handleButtonClick} value='350'>350</button>
            <button onClick={handleButtonClick} value='500'>500</button>
            <button onClick={handleButtonClick} value='700'>700</button>
            <table>
                <tbody>
                {stage.map((value,index)=>(
                <tr key={index}>
                    <td>약정금 : {value.deposit}</td>
                    <td>월 입금액 : {value.payment}</td>
                    <td>참가자수 : {value.pfEntry}</td>
                </tr>
                ))}
                </tbody>
            </table>
            <button onClick={modalHandler}>Modal</button>
            {error && <ErrorModal title={'Modal'} onConfirm={errorHandler}/>}
        </>
    );
    // const stageHandler = (event) => {
    //     const arr = [
    //         {
    //             약정금: '250', 월납입액: '50'
    //         },
    //         {
    //             약정금: '350', 월납입액: '50'
    //         },
    //         {
    //             약정금: '500', 월납입액: '100'
    //         },
    //         {
    //             약정금: '700', 월납입액: '100'
    //         }
    //     ]
    //     for (let i = 0; i < arr.length; i++){
    //         if (arr[i].약정금 == event.target.value){
    //             setDeposit(arr[i].약정금);
    //             setPayment(arr[i].월납입액);
    //         }
    //     }
    // };

    // return (
    //     <>
    //         <H1/>
    //         {/*<div>*/}
    //         {/*    <button>onClick={}전체</button>*/}
    //         {/*    <button onClick={stageHandler} value='250'>250</button>*/}
    //         {/*    <button onClick={stageHandler} value='350'>350</button>*/}
    //         {/*    <button onClick={stageHandler} value='500'>500</button>*/}
    //         {/*    <button onClick={stageHandler} value='700'>700</button>*/}
    //         {/*</div>*/}
    //         {/*<div>*/}
    //         {/*    <p>약정금: {deposit}</p>*/}
    //         {/*      월 납입금: {payment}*/}
    //         {/*</div>*/}
    //         <button onClick={modalHandler}>Modal</button>
    //         {error && <ErrorModal title={'Modal'} onConfirm={errorHandler}/>}
    //     </>
    // );
}

export default Stage;