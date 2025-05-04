import styled from 'styled-components';

const StyledHeader = styled.h1`
    margin: 20px 0 0 0 // top right bottom left
`;

function Header() {
    return <StyledHeader>List of Jobs</StyledHeader>
}

export default Header;