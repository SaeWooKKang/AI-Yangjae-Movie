const Detail = () => {

  return (
    <div className="album">
      <div className="container">
        <div className="card mb-3">
          <div className="card-img-top" style={{textAlign: 'center'}}>
            <img src="https://search.pstatic.net/common?type=o&size=174x246&quality=100&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20220720_283%2F1658284839003UzxoT_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2" alt="..." />
          </div>
          <div className="card-body">
            <h5 className="card-title">Movie Image</h5>
            <p className="card-text">Imag Example</p>
            
            <p className="card-text"><small className="text-muted">url...</small></p>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">제목</label>
          <div className="card">
            <p className="card-body">
              제목입니다.
            </p>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">내용</label>
          <div className="card">
            <p className="card-body">
              내용입니다.
            </p>
          </div>
        </div>
        <button type="button" className="btn btn-outline-danger">뒤로가기</button>
      </div>
    </div>
  );
}

export default Detail;