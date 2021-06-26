
import { img300, noPicture } from "../../helpers/config";
import styled from 'styled-components';

const CastnCrew = ({ credits, title }) => {

    return (
        <>
        <h3 style={{textAlign: 'center'}}>Cast of {title}</h3>
        <CastWrap>
            {credits && credits.map(credit => (
                <Cast key={credit.id}>
                    <img 
                        src={credit.profile_path 
                            ? `${img300}/${credit.profile_path}` 
                            : noPicture
                        } 
                        alt={credit?.name}
                        className="cast-img"
                    /> 
                    <div className="cast-name">
                        <h4>{credit.character}</h4>
                        <h4>By : {credit.name}</h4>
                    </div>
                </Cast>
            ))}
        </CastWrap>
        </>
    )
}

const CastWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const Cast = styled.div`
    display: flex;
    align-items: center;
    border-left: 5px solid #f99185;
    padding-left: 2px;
    max-width: 350px;
    margin: 15px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, .3);
    border-radius: 5px;
    min-width: 280px;

    .cast-img {
        width: 50px;
        padding: 5px;
    }

    .cast-name {
        display: flex;
        flex-direction: column;
        color: #fff;
        justify-content: center;
        color: #000;
        padding: 5px 15px;
    }
`

export default CastnCrew
