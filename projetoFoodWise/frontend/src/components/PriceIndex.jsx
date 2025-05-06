function PriceIndex({index}){

    const dollars = '$'.repeat(index);
    const grayed = '$'.repeat(5 - index);

    return (
        <span>
            <span style={{ color: '#000000' }}>{dollars}</span>
            <span style={{ color: '#e4e5e9' }}>{grayed}</span>
        </span>
     );
}

export default PriceIndex