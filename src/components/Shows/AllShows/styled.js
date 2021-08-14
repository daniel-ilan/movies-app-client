import styled from 'styled-components';

export const MoviesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  padding-top: 50px;
  width: 100%;
  background: linear-gradient(#121417 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(rgba(255, 255, 255, 0), #121417 70%) 0 100%,
    radial-gradient(farthest-side at 50% 0, rgb(0 0 0 / 69%), rgb(0 0 0 / 0%)),
    radial-gradient(
        farthest-side at 50% 100%,
        rgba(0, 0, 0, 0.2),
        rgba(0, 0, 0, 0)
      )
      0 100%;
  background-repeat: no-repeat;
  background-color: transparent;
  background-size: 100% 40px, 100% 40px, 100% 40px, 100% 14px;

  /* Opera doesn't support this in the shorthand */
  background-attachment: local, local, scroll, scroll;
`;

export const AllShowsContainer = styled.div`
  display: flex;
  height: 100%;
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SideNav = styled.div`
  flex-grow: 2;
`;
