import { img300, noPicture } from '../../helpers/config';
import styled from 'styled-components';

const CastnCrew = ({ credits, title }) => {
  return (
    <section>
      <h2 className="text-center font-bold text-2xl">Cast of {title}</h2>
      <div className="flex justify-center items-center gap-4">
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
      </div>
    </section>
  );
};

const Cast = styled.div`
  display: flex;
  align-items: center;
  border-left: 5px solid #f99185;
  padding-left: 2px;
  width: 350px;
  min-width: 280px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

export default CastnCrew;
