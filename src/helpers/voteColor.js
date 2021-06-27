const voteColor = (voteAvg) => {
    if(voteAvg > 7){
        return "#388e3c"
    }
    else if(voteAvg < 7 && voteAvg > 4){
        return "#303f9f"
    }
    else if(voteAvg === 0){
        return "#666"
    }
    else {
        return "#d32f2f"
    }
}

export default voteColor;
