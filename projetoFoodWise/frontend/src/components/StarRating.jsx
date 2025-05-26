function StarRating({rating}) {
    const fillPercent = (rating / 5) * 100;
  
    return (
      <div className="star-rating">
        <div className="stars-back">★★★★★</div>
        <div className="stars-front" style={{ width: `${fillPercent}%` }}>
          ★★★★★
        </div>
      </div>
    );
  }
  
  export default StarRating