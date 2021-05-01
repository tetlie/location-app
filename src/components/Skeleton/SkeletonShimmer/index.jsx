import styled from "styled-components";

export const SkeletonShimmer = styled.div`
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: skewX(-20deg);
  box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.05);
`;

export default SkeletonLocationLinkItem;
