import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useCookies } from 'react-cookie';
import url from '../../data/port.json';
import { useNavigate } from 'react-router-dom';

/**
 * form 입력받고 
 * 제출시 
 * review/list로 redirect 
 */
const Create = () => {
  const [cookies, setCookies, removeCookie] = useCookies(['userData']);

  // DOM 선택을 위한 refs
  const imgRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  const navigate = useNavigate();

  // form 양식 
  const [createReview, setCreateReview] = useState({
    img: '',
    title: '',
    content: '',
    email: cookies.userData.email
  });

  // handler
  const onChangeCreateReview = e => {
    setCreateReview({
      ...createReview,
      [e.target.name]: e.target.value
    })
  }
  const onClickCreateReviewButton = () => {

    // 유효성 검사
    if (createReview.img === '') {
      alert('이미지 경로를 입력해주세요.');
      imgRef.current.focus();
      return;
    }
    if (createReview.title === '') {
      alert('타이틀을 입력해주세요.');
      titleRef.current.focus();

      return;
    }
    if (createReview.content === '') {
      alert('컨텐츠를 입력해주세요.');
      contentRef.current.focus();

      return;
    }

    sendCreateReview()
      .then(res => {
        alert(res.data.result);
        navigate('/review/list');
      })
      .catch(err => console.log(err))
  }

  // server 요청 함수 
  const sendCreateReview = async () => {
    return await axios.post(`${ url.url }/posts`, createReview, {
      headers: {
        accessToken: cookies.userData.accessToken
      }
    });
  }

  return (
    <div className="album">
      <div className="container">
        <div className="card mb-3">
          <div className="card-img-top" style={{textAlign: 'center'}}>
            {
              createReview.img !== '' 
                && <img src={ createReview.img } alt="movie img" /> 
            }
            
          </div>
          <div className="card-body">
            <h5 className="card-title">Movie Image</h5>
            <p className="card-text">Imag Example</p>
            <input ref={ imgRef } type="" onChange={ onChangeCreateReview } className="form-control" name='img' id="img" placeholder="이미지 URL을 입력해주세요" />
            <p className="card-text"><small className="text-muted">url...</small></p>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">제목</label>
          <input ref={ titleRef } onChange={ onChangeCreateReview } type="" className="form-control" name='title' id="title" placeholder="제목을 입력해주세요." />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">내용</label>
          <textarea ref={ contentRef } onChange={ onChangeCreateReview } className="form-control" name="content" id="content" rows="3"></textarea>
        </div>
        <button onClick={ onClickCreateReviewButton } type="button" className="btn btn-outline-primary" style={{marginRight: '2%'}}>생성</button>
        <button type="button" className="btn btn-outline-danger">뒤로가기</button>
      </div>
    </div>
  );
}

export default Create;