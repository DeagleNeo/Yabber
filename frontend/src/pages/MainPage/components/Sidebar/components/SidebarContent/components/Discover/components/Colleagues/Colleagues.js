import styled from "styled-components";
import Colleague from "./components/Colleague";

const ColleaguesTitle = styled.div`
  margin: 0 0 10px 20px;
  color: #888;
  font-size: 16px;
  font-weight: 600;
`;

const ColleaguesGroup = styled.div`
  padding: 0px 10px 0px 20px;
  max-height: 50%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const NoResults = styled.div`
  margin-left: 20px;
  font-weight: 900;
`;

const Colleagues = ({ colleagues, query }) => {
  const filteredColleagues = colleagues?.filter((item) => {
    if (item.name.match(new RegExp(query, "i"))) return item;
    return null;
  });

  return (
    <>
      {colleagues.length > 0 && (
        <>
          <ColleaguesTitle>Colleagues ({colleagues.length})</ColleaguesTitle>
          {filteredColleagues.length === 0 ? (
            <NoResults>No results for your search</NoResults>
          ) : (
            <ColleaguesGroup>
              {filteredColleagues.map((colleague) => {
                return (
                  <Colleague
                    key={colleague._id}
                    _id={colleague._id}
                    avatar={colleague.avatar}
                    name={colleague.name}
                    desc={colleague.description}
                  />
                );
              })}
            </ColleaguesGroup>
          )}
        </>
      )}
    </>
  );

  // return (
  //   <>
  //     <ColleaguesTitle>Colleagues ({colleagues.length})</ColleaguesTitle>
  //     {filteredColleagues.length === 0 ? (
  //       <NoResults>No results for your search</NoResults>
  //     ) : (
  //       <ColleaguesGroup>
  //         {filteredColleagues.map((colleague) => {
  //           return (
  //             <Colleague
  //               key={colleague._id}
  //               _id={colleague._id}
  //               avatar={colleague.avatar}
  //               name={colleague.name}
  //             />
  //           );
  //         })}
  //       </ColleaguesGroup>
  //     )}
  //   </>
  // );
};

export default Colleagues;
