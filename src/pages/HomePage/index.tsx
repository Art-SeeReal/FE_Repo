import React, { ChangeEvent } from 'react';
import StyledButton from '../../components/styles/Button';
import StyledField from '../../components/styles/Field';
import FormControl from '../../components/FormControl';
import StyeldLogo from '../../components/styles/Logo';

const HomePage = () => {
  return (
    <>
      <StyeldLogo />
      <StyeldLogo $width="90px" $grayscale />

      <FormControl label="아이디" htmlFor="userid" required error>
        <StyledField id="userid" />
      </FormControl>
      <FormControl label="비밀번호" htmlFor="userpassword" required>
        <StyledField id="userpassword" />
      </FormControl>

      <div>
        <StyledButton $size="large">1</StyledButton>
        <StyledButton $size="large" $style="border">
          2
        </StyledButton>
        <StyledButton $size="large" $style="secondary">
          3
        </StyledButton>
        <StyledButton $size="large" disabled>
          1
        </StyledButton>
        <StyledButton $size="large" $style="border" disabled>
          2
        </StyledButton>
        <StyledButton $size="large" $style="secondary" disabled>
          3
        </StyledButton>
      </div>

      <div>
        <StyledField
          size="small"
          placeholder="핸드폰번호 입력"
          onChange={(e: ChangeEvent) => console.log(e.target)}
          $block={false}
          $error
        />
        <StyledField
          placeholder="핸드폰번호 입력"
          onChange={(e: ChangeEvent) => console.log(e.target)}
          $block={false}
        />
        <StyledField as="textarea" defaultValue="Textarea^^" />
        <StyledField as="select" $error defaultValue="2">
          <option value="">선택하세요</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </StyledField>
      </div>
    </>
  );
};

export default HomePage;
