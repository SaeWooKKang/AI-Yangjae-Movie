import reviewData from '../data/review.json';

const Review = () => {

  return (
    <main>
      <section className="py-5 text-center container">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 className="fw-light">Movie</h1>
            <p className="lead text-muted">리뷰하고 싶은 영화를 추가하고, 
              별점을 주세요. <br />
              또한 삭제, 수정이 가능합니다.
            </p>
            <p>
              <button className="btn btn-primary my-2 m-1" >
                Create Review
              </button>
              
            </p>
          </div>
        </div>
      </section>
      <div className="album py-5">
        <div className="container">

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {
              reviewData.map((it, index) => (
                <div className="col" key={ index }>
                  <div className="card shadow-sm">
                    <div className='card-img-top' style={{ textAlign:'center' }}>
                      <img src={it.img} className="bd-placeholder-img " width="50%" height="225" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" />
                    </div>
    
                    <div className="card-body">
                      <p className="card-text">{ it.content.substring(0,((it.content).length / 2)) }
                        <a style={{color: 'blue'}}> ...더보기</a>
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                          <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                        </div>
                        <small className="text-muted">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div> 
              ))
            }
            
          </div>
        </div>
      </div>
    </main>
  );
}

export default Review;