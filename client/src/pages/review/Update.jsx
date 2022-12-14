import axios from "axios";
import { useEffect, useState, useRef } from "react";
// import { useSelector } from "react-redux";
import url from "./../../data/port.json";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";

/**
 * mount 되고
 * redux store에 저장된 shortId를 가지고
 * 서버에 해당 post 데이터 요청
 * 응답 받은 데이터를 state에 저장하고
 * 리렌더링되어 form에 기존 post 채워짐
 */
const Update = () => {
    const imgRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();

    const naviagte = useNavigate();

    const params = useParams();

    const [cookies, setCookie, removeCookie] = useCookies(["userData"]);

    const [updateData, setUpdateData] = useState({});

    // ReviewList.jsx에서 수정 버튼클릭시 redux에 저장한 shortId 가져옴
    //   let params.id = useSelector(state => state.id.value);

    useEffect(() => {
        findGetReviewData(params.id).then((res) => {
            console.log(res);
            setUpdateData(res.data);
        });
    }, []);

    // 서버 요청 함수
    const findGetReviewData = async (shortId) => {
        return await axios.get(url.url + `/posts/${params.id}/find`, {
            headers: {
                accessToken: cookies.userData.accessToken,
            },
        });
    };

    // handler
    const onChangeUpdateData = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * 수정 버튼 클릭시
     * 유효성 검사하고
     * 서버 요청하고
     * review/list 리다이렉션
     */
    const onClickChangeUpdateData = () => {
        // input 유효셩 검사..
        if (updateData.img === "") {
            alert("이미지 경로를 입력해주세요.");
            imgRef.current.focus();
            return;
        }
        if (updateData.title === "") {
            alert("타이틀을 입력해주세요.");
            titleRef.current.focus();

            return;
        }
        if (updateData.content === "") {
            alert("컨텐츠를 입력해주세요.");
            contentRef.current.focus();

            return;
        }

        // 서버 요청
        sendUpdateData()
            .then((res) => {
                alert(res.data.result);
                naviagte("/review/list");
            });
    };

    const sendUpdateData = async () => {
        return await axios.post(
            `${url.url}/posts/${params.id}/update`,
            updateData,
            {
                headers: {
                    accessToken: cookies.userData.accessToken,
                },
            }
        );
    };

    return (
        <div className="album">
            <div className="container">
                <div className="card mb-3">
                    <div className="card-img-top" style={{ textAlign: "center" }}>
                        <img src={updateData.img} alt="movie img" />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Movie Img</h5>
                        <p className="card-text">Img Example</p>
                        <input
                            ref={imgRef}
                            type="text"
                            className="form-control"
                            defaultValue={updateData.img}
                            onChange={onChangeUpdateData}
                            name="img"
                            disabled
                            id="img"
                            placeholder="사진 URL을 입력해주세요."
                        />
                        <p className="card-text">
                            <small className="text-muted">url...</small>
                        </p>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        제목
                    </label>
                    <input
                        ref={titleRef}
                        type="text"
                        className="form-control"
                        defaultValue={updateData.title}
                        onChange={onChangeUpdateData}
                        name="title"
                        id="title"
                        placeholder="제목을 입력해주세요."
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">
                        내용
                    </label>
                    <textarea
                        ref={contentRef}
                        className="form-control"
                        name="content"
                        defaultValue={updateData.content}
                        onChange={onChangeUpdateData}
                        id="content"
                        rows="3"
                    ></textarea>
                </div>
                <button
                    onClick={onClickChangeUpdateData}
                    type="button"
                    className="btn btn-outline-primary"
                    style={{ marginRight: "2%" }}
                >
                    수정
                </button>
                <button
                    onClick={() => window.history.back()}
                    type="button"
                    className="btn btn-outline-danger"
                >
                    뒤로가기
                </button>
            </div>
        </div>
    );
};

export default Update;
