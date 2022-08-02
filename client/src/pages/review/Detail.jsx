import { useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import url from '../../data/port.json';
import { useEffect, useState, useRef } from "react";

const Detail = () => {
  const params = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(['userData']);
  const [detaildata, setDetailData] = useState({});

  const findDetailData = async () => {
    return await axios.get(`${url.url}/posts/${params.id}/find`, {
      headers: {
        accessToken: cookies.userData.accessToken
      }
    })
  }
  useEffect(() => {
    findDetailData().then(res => {
      setDetailData(res.data);
    });
  }, []);

  return (
    <div className="album">
      <div className="container">
        <div className="card mb-3">
          <div className="card-img-top" style={{textAlign: 'center'}}>
            <img src={ detaildata.img } alt="..." />
          </div>
          <div className="card-body">
            <h5 className="card-title">Movie Image</h5>
            <p className="card-text">Imag Example</p>
            
            <p className="card-text"><small className="text-muted">{detaildata.img}</small></p>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">제목</label>
          <div className="card">
            <p className="card-body">
              {detaildata.title}
            </p>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">내용</label>
          <div className="card">
            <p className="card-body">
            {detaildata.content}
            </p>
          </div>
        </div>
        <button type="button" onClick={() => window.history.back()}className="btn btn-outline-danger">뒤로가기</button>
      </div>
    </div>
  );
}

export default Detail;