import styled from 'styled-components'


const SkeletonShimmerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: loading 1.5s infinite ease-in; 

  @keyframes loading {
    0% { transform: translateX(-150%) }
    50% { transform: translateX(-60%) }
    100% { transform: translateX(150%) }
  }
`

export default SkeletonShimmerWrapper;