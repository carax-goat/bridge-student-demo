'use strict';
// Summarized from the original service's AI-assignment practice cards.
// The detailed cards in this design demo use this topic as the reference example.
const rolePerspectives={
 '과제가 많은 학생':{id:'representative',focus:'과제 부담과 배움의 균형',about:'여러 과제와 교내외 활동을 함께 챙기는 학생이에요.',goal:'AI의 도움으로 과제 부담을 덜면서도 직접 배우는 과정을 지키고 싶어요.',concern:'AI를 사용했다는 이유만으로 부정행위로 여겨지거나, 과목마다 사용 기준이 달라 혼란스러울까 걱정해요.',question:'도움을 받은 과정과 스스로 한 부분을 어떻게 보여줄 수 있을까요?'},
 '국어 교사':{id:'language-teacher',focus:'직접 생각하고 표현하는 과정',about:'학생의 글쓰기 과정과 성장을 평가하는 교사예요.',goal:'학생이 스스로 생각하고 글로 표현한 과정을 평가하고 싶어요.',concern:'AI가 만든 결과물만으로 학생의 실력을 판단하거나, 글쓰기 연습이 줄어들까 걱정해요.',question:'완성된 글 외에 어떤 과정을 함께 확인하면 좋을까요?'},
 'AI 동아리 학생':{id:'ai-student',focus:'AI를 올바르게 배우는 기회',about:'AI 도구를 사용하고 탐구하는 동아리 학생이에요.',goal:'학교에서 AI의 가능성과 올바른 사용법을 배울 기회를 얻고 싶어요.',concern:'전면 금지로 배울 기회가 사라질까 걱정해요. AI의 오류를 알아보고 확인하는 방법도 필요해요.',question:'도구를 금지하는 대신 안전하게 배우려면 무엇이 필요할까요?'},
 '학부모':{id:'parent',focus:'정직한 배움과 공정한 기회',about:'자녀의 숙제와 학습 과정을 함께 살피는 학부모예요.',goal:'자녀가 정직하게 과제를 하면서 스스로 실력을 기르길 바라요.',concern:'가정마다 사용할 수 있는 AI 도구가 다르거나, 자녀가 도구에 의존하게 될까 걱정해요.',question:'도구를 쓸 수 있는 환경의 차이를 어떻게 줄일 수 있을까요?'},
 '정보보호 담당 교사':{id:'computing-teacher',focus:'개인정보와 저작권 보호',about:'학교의 디지털 안전과 학생 개인정보를 살피는 교사예요.',goal:'AI를 활용하는 과정에서 개인정보와 저작권을 보호하고 싶어요.',concern:'과제 중 개인정보가 외부 도구에 입력되거나, 생성된 내용의 출처가 불분명할까 걱정해요.',question:'AI에 입력하면 안 되는 정보와 출처 표시 기준은 무엇일까요?'}
};
for(const name of Object.keys(roleSymbols))delete roleSymbols[name];
for(const [name,p]of Object.entries(rolePerspectives))roleSymbols[name]={id:p.id,meaning:p.focus};
