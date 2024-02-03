import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props)=> {

  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0)
  
  const capitalize=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  
  const updateNews=async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(70);
    setArticle(parsedData.articles);
    setTotalResults(parsedData.totalResults); 
    setLoading(false); 
    props.setProgress(100);
  }
  
  useEffect(() => {
    document.title=`${capitalize(props.category)} - NewsMonkey`
    updateNews();
    //eslint-disable-next-line
  },[])
  
  // handlePrevClick = async () => {
    //   console.log('prev')
    //   //  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=326adf7345124f928c4361e58a24e0ce&page=${state.page +1}&pageSize=${props.pageSize}`;
    //   //  setState({loading:true});
    //   //  let data=await fetch(url);
    //   //  let parsedData=await data.json();
    //   //  setState({
      //   //    page:state.page - 1,
      //   //    article: parsedData.articles,
  //   //    loading:false
  //   //  }); 
  //   setState({ page: (state.page - 1) });
  //   updateNews();
  // }

  // handleNextClick = async () => {
  //   console.log('next')


  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=326adf7345124f928c4361e58a24e0ce&page=${state.page +1}&pageSize=${props.pageSize}`;
  //   // setState({loading:true});
  //   // let data=await fetch(url);
  //   //  let parsedData=await data.json();
  //   //  setState({
  //   //    page:state.page + 1,
  //   //    article: parsedData.articles,
  //   //    loading:false
  //   //  }); 
  //   setState({ page: (state.page + 1) });
  //   updateNews();
  // }

  const fetchMoreData= async()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
     let data = await fetch(url);
     let parsedData = await data.json();
     console.log(parsedData);
     setArticle(article.concat(parsedData.articles));
     setTotalResults(parsedData.totalResults);
  }

  
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{margin:'35px 0px', marginTop:'90px'}}> NewsMonkey - Top  {capitalize(props.category)} Headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResults}
        loader={<Spinner/>}
        >
        <div className="row">
          {article.map((ele,index) => {
            return <div className="col-md-4 my-1" key={index} >
              <NewsItem title={ele.title} description={ele.description} imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name} />
            </div>
          })}
        </div>
        </InfiniteScroll>
        {/* <div className="container my-4 d-flex justify-content-center">
          <button type="button" disabled={state.page <= 1} className="btn btn-dark mx-3" onClick={handlePrevClick}>&larr; Prev </button>
          <button type="button" disabled={state.page + 1 > Math.ceil(state.totalResults / props.pageSize)} className="btn btn-dark mx-3" onClick={handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }

News.defaultProps = {
  country: 'in',
  category: 'general',
  pageSize: 8
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number
}

export default News
