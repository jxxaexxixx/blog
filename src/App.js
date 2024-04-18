import { useState } from 'react';
import './App.scss';
import React from 'react';



function App() {
    let title = 'ReactBlog';
    let [post,setPost] = useState(['여자 코드 추천','남자 코드 추천','애기 코드 추천']);
    let [date,date변경] = useState(['2월10일 발행', '1월 10일 발행', '3월 10일 발행']);
    let [따봉, 따봉변경] = useState([0, 0, 0]);
    let [modal, setModal] = useState(false);
    let [input, setInput] = useState('');
    const [selectedPostIndex, setSelectedPostIndex] = useState(null);

    return (
        <div className='App'>
            <div className="title">
                <h4>{title}</h4>
            </div>
            <button onClick={() => {
                let copy2 = [...post];
                copy2.sort();
                setPost(copy2);
            }}>가나다순정렬</button>

            {/* <button onClick={() => {
                let copy = [...post];
                copy[0] = 'g2222';
                b(copy);
            }}>수정</button>
            <div className="list">
                <h4>{post[0]} <span onClick={()=>{따봉변경(따봉 + 1)}}>👍</span> {따봉} </h4>
                <p>{date1}</p>
            </div>
            <div className="list">
                <h4>{post[1]}</h4>
                <p>{date2}</p>
            </div>
            <div className="list">
                <h4 onClick={()=>{ modal == true ? setModal(false) : setModal(true)}}>{post[2]}</h4>
                <h4 onClick={() => setModal(!modal)}>{post[2]}</h4>
                <p>{date3}</p>
            </div> */}
            {/* {
                post.map(function (a,i) {
                    return (
                        <div className="list" key={i}>
                            <h4  onClick={() => setModal(!modal)}>{post[i]} <span onClick={() => {
                                const new따봉 = [...따봉];  따봉 배열 복사
                                new따봉[i] += 1;  해당 인덱스의 따봉 수 증가
                                따봉변경(new따봉);  상태 업데이트
                            }}>👍</span> {따봉[i]}</h4>  각 게시물의 따봉 수 표시
                            <p>{date[i]}</p>
                        </div>
                    )
                })
            }
            {
                삼항연산자
                조건식 ? 참일때 실행할코드 : 거짓일 때 실행할코드
                modal === true ? <Modal color="yellow" post={post} date={date} /> : null
            } */}

            <input type="text" onChange={(e) => {
                setInput(e.target.value)
                // console.log(input)
            }} />
            <button onClick={() => {
                 // 현재 날짜를 '월 일 발행' 형식으로 변환합니다.
                const currentDate = new Date();
                const formattedDate = `${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일 발행`;
                // 새로운 날짜를 date 배열에 추가합니다.
                const newDates = [...date, formattedDate];
                setPost([...post, input]); // 'post' 배열에 'input' 값을 추가합니다.
                따봉변경([...따봉, 0]); // 새 글에 대한 '따봉' 상태도 추가합니다.
                date변경(newDates);
            }}>
                글 추가
            </button>
            {
                post.map(function (a, i) {
                    return (
                        <div className={`list list_${i}`}  key={i}>
                            <h4 onClick={() => {
                                setModal(!modal)
                                setSelectedPostIndex(i);
                            }}>
                                {post[i]} <span onClick={(e) => {
                                    e.stopPropagation(); // 상위 h4 태그로 이벤트 전파를 막습니다.
                                    const new따봉 = [...따봉];
                                    new따봉[i] += 1;
                                    따봉변경(new따봉);
                                }}>👍</span> {따봉[i]}
                            </h4>
                            <p>{date[i]}</p>
                            <button onClick={(e) => {
                                e.stopPropagation(); // h4 태그의 클릭 이벤트 전파를 막습니다.
                                // post, 따봉, date 배열에서 해당 인덱스의 요소를 제거합니다.
                                // const updatedPosts = [...post.slice(0, i), ...post.slice(i + 1)];
                                // const updated따봉 = [...따봉.slice(0, i), ...따봉.slice(i + 1)];
                                // const updatedDate = [...date.slice(0, i), ...date.slice(i + 1)];
                                const updatedPosts = post.filter((_, index) => index !== i);
                                const updated따봉 = 따봉.filter((_, index) => index !== i);
                                const updatedDate = date.filter((_, index) => index !== i);
                                setPost(updatedPosts);
                                따봉변경(updated따봉);
                                date변경(updatedDate);
                                //이러케하면 따봉이랑 데이트가 남아있어.. 다삭제해야해
                                // let copy = [...post];
                                // copy.splice(i, 1);
                                // setPost(copy);
                            }}>
                                글 삭제
                            </button>
                        </div>
                    )
                })
            }
            {
                modal && selectedPostIndex !== null && (
                    <Modal color="yellow" poChange={setPost} selectedPostIndex={selectedPostIndex}  post={post[selectedPostIndex]} date={date[selectedPostIndex]} />
                )
            }
            <Modal2/>

        </div>
    );
}
//컴포넌트로 만든면 좋은예시
//1.반복적인 html 축약시
//2.큰페이지(전환시)
//3 자주변경될 거 같은 ui들

//const 변수는 실수시 에러메세지를 뱉움
// const Modal2 = () => {
//     return (
//         <div></div>
//     )
// }



//props는 부모->자식에서만 공유가능
function Modal(props) {
    return (
        // 의미없는 디브쓰기시렁 <></>
        <div className="modal" style={{backgroundColor: props.color}}>
            <h4>{props.post}</h4>
            <p>{props.date}</p>
            <p>상세내용</p>
            <button onClick={() => {
                props.poChange(prevPosts => {
                    const updatedPosts = [...prevPosts];
                    updatedPosts[props.selectedPostIndex] = '사람 코드 추천';
                    return updatedPosts;
                });
            }}>
                글수정
            </button>

        </div>
    )
}

class Modal2 extends React.Component{
    //옛날 컴포넌트문법
    constructor(props) {
        super(props);
        this.state = {
            name: 'jaei',
            age : 28
        }
    }
    render() {
        return (
            <div>
                안녕, {this.state.name}
                <button onClick={() => {
                    this.setState({name : 'park'})
                }}>성이뭐야</button>
            </div>
        )
    }
}

export default App;
