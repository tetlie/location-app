import styled from 'styled-components'

export const SkeletonText = styled.div`
  background: #ddd;
  margin: 10px 0;
  border-radius: 4px;
  width: 90%;
  height: 1rem;
  margin: 15px;

  @media screen and (max-width: 768px) {
    height: 1rem;
  }

  @media screen and (max-width: 480px) {
    height: 0.75rem;
  }
`

export default SkeletonText;