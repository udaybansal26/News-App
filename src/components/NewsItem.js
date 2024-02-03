import React from 'react'

const NewsItem =(props)=> {

  
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div> 
        <div className="card my-1">
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0 '
          }}>


            <span className='badge rounded-pill bg-danger'>{source}</span>
          </div>
          <img src={!imageUrl ? 'https://www.elfinanciero.com.mx/resizer/0deF1ZzqST1clpk6OT7qaNBq-nQ=/1200x630/filters:format(png):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/elfinanciero/I77FD6USMNE5HMSP6QL5GVQ32Y.png' : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted"> By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</ small></p>
            <a href={newsUrl} target='_blank ' className="btn btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
  }


export default NewsItem
