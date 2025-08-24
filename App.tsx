
import React from 'react';
import Header from './components/Header';
import Section from './components/Section';
import ConsultingForm from './components/ConsultingForm';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-alpaka-bg text-alpaka-text font-sans leading-8 bg-[radial-gradient(circle_at_25px_25px,rgba(0,240,255,0.3)_1px,transparent_0),radial-gradient(circle_at_75px_75px,rgba(0,240,255,0.3)_1px,transparent_0)] bg-[length:100px_100px]">
      <Header />
      <main className="max-w-6xl mx-auto overflow-hidden px-5">
        <Section className="text-center">
          <h2 className="text-3xl md:text-4xl font-orbitron text-alpaka-accent text-center mb-8">도심 신축 건물의 주차 문제, ALPAKA가 해결해 드립니다.</h2>
          <h3 className="text-2xl md:text-3xl font-orbitron text-alpaka-accent text-center mb-8 mt-0 border-b border-alpaka-border pb-4 leading-snug">건축주님, 혹시 주차장 때문에 고민하고 계신가요?</h3>
          <p className="mb-4">"편의를 위해 이용하는 자동차, 하지만 주차는 단 한 번도 편한 적이 없다.”<br />목적지 도착 후에도 주차 공간을 찾아 헤매고, 비좁은 공간에 몇 번이고 차를 넣고 빼는 불편한 경험, 누구나 한 번쯤은 겪어보셨을 겁니다.</p>
          <p>기존 주차장은 전체 건축 면적의 상당 부분을 차지하여 건축비를 상승시키는 주요 원인이 됩니다.<br />주차 공간은 45%에 불과하지만, 통로 등 주차 외 공간이 55%를 차지하는 비효율적인 구조이기 때문입니다.</p>
        </Section>

        <Section>
          <h3 className="text-2xl md:text-3xl font-orbitron text-alpaka-accent text-center mb-8 mt-0 border-b border-alpaka-border pb-4 leading-snug">SDP(Software Defined Parking) 솔루션 : 건설에서 찾은 혁신</h3>
          <p className="text-center">ALPAKA는 이 문제를 건설의 관점에서 재정의했습니다. 로봇 주차 기술은 이미 완성되었지만, 높은 투자비 부담으로 사업성이 미완성이었습니다.</p>
          <div className="bg-[rgba(0,240,255,0.05)] p-5 border-l-4 border-alpaka-accent rounded-md text-center font-medium text-lg my-8 mx-auto max-w-[80%]">
            해결책은 간단합니다. 건축비를 줄여 로봇 설치비로 전환하는 것입니다.
          </div>
          <p className="text-center">ALPAKA의 로봇 주차 특화 설계를 통해 <strong>기존 대비 40%의 면적을 절감</strong>하고, 동일한 주차 대수를 확보할 수 있습니다.<br />이를 통해 확보된 건축비 절감액으로 로봇 주차 시스템 도입이 가능해져, 수익성을 극대화할 수 있습니다.</p>
          <div className="text-center text-xl font-bold tracking-wider my-10">
            건축 면적 감소 → 건축비 감소 → 주차 로봇 설치 가능 → 수익성 증대
          </div>
        </Section>

        <Section>
            <h3 className="text-2xl md:text-3xl font-orbitron text-alpaka-accent text-center mb-8 mt-0 border-b border-alpaka-border pb-4 leading-snug">ALPAKA의 3단계 맞춤형 솔루션</h3>
            <p className="text-center">고객의 부담을 덜어드리기 위해 컨설팅부터 운영까지 완벽한 솔루션을 3단계로 나누어 제공합니다.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                <StepCard
                    title="STEP 1: 로봇 주차 특화 모듈 설계 컨설팅"
                    description={
                        <>
                            <p><strong>SDP-Sim (타당성 분석 SaaS):</strong> 건축 도면을 기반으로 디지털 시뮬레이션을 통해 절감 가능한 면적과 비용을 정량적 ROI 분석 리포트로 제공합니다.</p>
                            <p><strong>수익 모델:</strong> 절감되는 금액의 일정 비율로 수수료를 책정하여 합리적입니다.</p>
                        </>
                    }
                />
                <StepCard
                    title="STEP 2: 로봇 주차 운영체제(OS) 공급"
                    description={
                        <>
                            <p><strong>SDP-Logic (로봇 운영 시스템):</strong> 하드웨어에 독립적인 개방형 OS로, 최적 경로 탐색 및 동적 재배치 등 핵심 기술을 통해 효율적인 주차 관리가 가능합니다.</p>
                            <p><strong>수익 모델:</strong> 도입되는 로봇 대수를 기반으로 라이선스 비용이 책정됩니다 (로봇 가격의 10%).</p>
                        </>
                    }
                />
                <StepCard
                    title="STEP 3: 사용자 & 관리자 플랫폼 제공"
                    description={
                        <>
                            <p><strong>ALPAKA (통합 관리 플랫폼):</strong> 사용자용 모바일 앱과 관리자용 웹을 통해 편리한 주차 경험을 제공하고, 데이터 기반 운영 최적화를 지원합니다.</p>
                            <p><strong>수익 모델:</strong> 주차면 수 기준 월 시스템 이용료(SaaS 구독)를 통해 안정적인 운영이 가능합니다.</p>
                        </>
                    }
                />
            </div>
        </Section>
        
        <Section>
            <h3 className="text-2xl md:text-3xl font-orbitron text-alpaka-accent text-center mb-8 mt-0 border-b border-alpaka-border pb-4 leading-snug">ALPAKA의 기술력과 전문성</h3>
            <ul className="list-none p-0 space-y-3">
                <li className="bg-[rgba(0,240,255,0.05)] p-4 border-l-4 border-alpaka-accent rounded"><strong>독자적인 AI 알고リズム:</strong> 실시간 차량 배치 및 로봇 제어 로직을 통해 최단 경로를 산출하고, 차량 간 간섭 및 장애물을 실시간으로 계산하여 재배치합니다.</li>
                <li className="bg-[rgba(0,240,255,0.05)] p-4 border-l-4 border-alpaka-accent rounded"><strong>검증된 실증 사업:</strong> 현대자동차 고양 및 제네시스 모터 스튜디오와의 PoC를 통해 기술력과 사업성을 검증받았습니다.</li>
                <li className="bg-[rgba(0,240,255,0.05)] p-4 border-l-4 border-alpaka-accent rounded"><strong>최고의 전문가 팀:</strong> 신사업 전략, 투자, 기술 설계, 시장 전략 등 각 분야 최고의 경력을 갖춘 인력과 카이스트, 홍익대, 남서울대 등 학계 최고 교수진이 기술 자문으로 함께합니다.</li>
            </ul>
        </Section>

        <Section className="bg-gradient-to-br from-[rgba(10,25,47,0.8)] to-[rgba(2,10,26,0.9)]">
            <h2 className="text-3xl md:text-4xl font-orbitron text-alpaka-accent text-center mb-8">
              수도권 신축 상가, 주차 공간 때문에 고민이신가요?<br/>
              SDP 솔루션으로 얼마나 더 확보할 수 있는지 즉시 확인해 보세요.
            </h2>
            <p className="text-center">수도권 내 55대 이상 주차 공간이 필요한 대형 상업 건물을 계획 중이신가요?<br/> ALPAKA의 혁신적인 SDP 솔루션을 통해 건축비를 절감하고 주차장 가치를 극대화할 기회를 놓치지 마십시오.</p>
            <ConsultingForm />
        </Section>
      </main>
      <Footer />
    </div>
  );
};


interface StepCardProps {
    title: string;
    description: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ title, description }) => {
    return (
        <div className="bg-[rgba(0,0,0,0.3)] border border-alpaka-border p-6 rounded-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-accent-hover">
            <h4 className="font-orbitron mt-0 text-alpaka-accent text-xl">{title}</h4>
            <div className="text-sm text-alpaka-subtext space-y-4">{description}</div>
        </div>
    );
};


export default App;
