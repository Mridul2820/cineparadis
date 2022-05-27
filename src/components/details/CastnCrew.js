import { img300, noPicture } from '../../helpers/config';
import styled from 'styled-components';

const CastnCrew = ({ credits, title }) => {
  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Cast of {title}</h3>
      <CastWrap>
        {credits &&
          credits.map((credit) => (
            <Cast key={credit.id}>
              <img
                src={
                  credit.profile_path
                    ? `${img300}/${credit.profile_path}`
                    : noPicture
                }
                alt={credit?.name}
                className="w-12 p-1"
              />
              <div className="flex flex-col justify-center px-3 py-1">
                <h4 className="text-black font-bold">{credit.name}</h4>
                <p className="text-slate-500">
                  as <span className="font-medium">{credit.character}</span>
                </p>
              </div>
            </Cast>
          ))}
      </CastWrap>
    </>
  );
};

const CastWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Cast = styled.div`
  display: flex;
  align-items: center;
  border-left: 5px solid #f99185;
  padding-left: 2px;
  width: 350px;
  min-width: 280px;
  margin: 15px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

export default CastnCrew;
