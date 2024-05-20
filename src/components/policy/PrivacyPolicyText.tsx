import React, { useMemo } from 'react';
import * as S from '../styles';

const PrivacyPolicyText = () => {
  return useMemo(
    () => (
      <>
        <section className="pb-5">
          <S.Title $size="xsmall" className="hidden">
            개인정보처리방침
          </S.Title>
          <p>
            아트씨리얼은 귀하의 개인정보 보호를 중요하게 생각하며, 본 개인정보처리방침은 귀하가 우리
            웹사이트([웹사이트주소])를 방문할 때 수집, 사용, 공개, 및 보호하는 방법을 설명합니다.
            <br />
            <br />
            개인정보처리방침을 주의 깊게 읽어주시기 바랍니다. 당사 웹사이트에 액세스하거나 사용함으로써, 귀하는 본
            개인정보처리방침의 모든 조항에 동의했음을 인정하며, 이를 준수할 것에 동의합니다. 본 조항에 동의하지 않는
            경우 이 페이지를 종료하고 당사 웹사이트에 액세스하거나 사용하지 마십시오.
          </p>
        </section>

        <section className="pb-5">
          <S.Title $size="xsmall">귀하의 정보 수집</S.Title>
          <p>
            귀하가 웹사이트의 양식을 통해 또는 직접 저희에게 연락을 취함으로써 이름, 이메일 주소 및 기타 연락처 세부
            정보와 같은 개인정보를 자발적으로 제공할 경우, 이러한 정보를 수집할 수 있습니다.
          </p>
        </section>

        <section className="pb-5">
          <S.Title $size="xsmall">귀하의 정보 사용</S.Title>
          <p>수집한 정보는 다음과 같은 다양한 목적으로 사용될 수 있습니다:</p>
          <ul>
            <S.DotListItem>웹사이트의 제공 및 유지</S.DotListItem>
            <S.DotListItem>웹사이트 변경에 대한 통보</S.DotListItem>
            <S.DotListItem>문의에 대한 응답 및 지원 제공</S.DotListItem>
            <S.DotListItem>마케팅 및 광고 목적</S.DotListItem>
            <S.DotListItem>웹사이트의 사용 분석을 통한 콘텐츠 및 기능 개선</S.DotListItem>
            <S.DotListItem>법적 의무 준수</S.DotListItem>
          </ul>
        </section>

        <section className="pb-5">
          <S.Title $size="xsmall">귀하의 정보 공개</S.Title>

          <p>귀하의 개인정보는 다음과 같은 상황에서만 제3자에게 공개될 수 있습니다:</p>
          <ul>
            <S.DotListItem>귀하의 동의가 있는 경우</S.DotListItem>
            <S.DotListItem>법적 의무 준수를 위해</S.DotListItem>
            <S.DotListItem>당사의 권리 또는 재산을 보호하고 지키기 위해</S.DotListItem>
            <S.DotListItem>웹사이트와 관련된 가능한 위법 행위의 조사 또는 예방을 위해</S.DotListItem>
            <S.DotListItem>웹사이트 사용자 또는 공중의 개인적 안전을 보호하기 위해</S.DotListItem>
          </ul>
        </section>

        <section className="pb-5">
          <S.Title $size="xsmall">귀하의 정보 보안</S.Title>
          <p>
            귀하의 개인정보의 기밀성을 보호하기 위해 산업 표준 보안 조치를 적용합니다. 그러나 인터넷을 통한 정보
            전송이나 전자 저장 방법이 100% 안전하다는 것을 인식하시기 바랍니다. 따라서 우리는 귀하의 개인정보를 보호하기
            위해 상업적으로 합리적인 수단을 사용하기는 하지만, 그 절대적인 보안을 보장할 수 없습니다.
          </p>
        </section>

        <section className="pb-5">
          <S.Title $size="xsmall">다른 웹사이트로의 링크</S.Title>
          <p>
            우리의 웹사이트에는 당사가 운영하지 않는 제3자 웹사이트로의 링크가 포함될 수 있습니다. 이러한 웹사이트의
            내용과 관행에 대해서는 당사가 제어하지 않으며, 이에 대한 책임이나 책임을 받지 않습니다.
          </p>
        </section>

        <section className="pb-5">
          <S.Title $size="xsmall">개인정보처리방침의 변경</S.Title>
          <p>
            본사는 개인정보처리방침을 언제든지 업데이트하거나 변경할 권리를 보유합니다. 변경 사항은 즉시 웹사이트에
            업데이트된 개인정보처리방침을 게시함으로써 효력을 발생합니다. 본 개인정보처리방침에 대한 수정 사항을 게시한
            후에도 귀하가 웹사이트를 계속 사용하면 수정 사항에 동의하고 준수하겠다는 것으로 간주됩니다.
          </p>
        </section>

        <section className="pb-5">
          <S.Title $size="xsmall">문의하기</S.Title>
          <p>본 개인정보처리방침에 대한 질문이나 우려 사항이 있으시면 [귀하의 연락 이메일]로 문의해 주시기 바랍니다.</p>
        </section>
      </>
    ),
    [],
  );
};

export default PrivacyPolicyText;
