function StarRating({rating}) {
    // calcula a porcentagem de preenchimento (0%…100%)
    const fillPercent = (rating / 5) * 100;
  
    return (
      <div className="star-rating">
        {/* estrelas de fundo (vazias) */}
        <div className="stars-back">★★★★★</div>
        {/* estrelas de frente (cheias), cortadas pelo width */}
        <div className="stars-front" style={{ width: `${fillPercent}%` }}>
          ★★★★★
        </div>
      </div>
    );
  }
  
  export default StarRating