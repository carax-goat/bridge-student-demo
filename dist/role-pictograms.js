// Original emoji-inspired role pictograms with round faces and role-specific objects.
const roleSymbols = {"학생회 대표":{"id":"representative","meaning":"함께 나아갈 기준을 제안해요."},"AI 동아리 학생":{"id":"ai-student","meaning":"새로운 도구의 가능성을 탐색해요."},"국어 교사":{"id":"language-teacher","meaning":"읽고 생각하는 과정을 지켜요."},"학부모":{"id":"parent","meaning":"아이의 배움 곁에서 함께해요."},"정보 교과 교사":{"id":"computing-teacher","meaning":"도구를 이해하고 바르게 활용해요."},"상담 교사":{"id":"counselor","meaning":"서로의 마음과 이야기를 들어요."}};
function rolePictogram(role, extraClass='') {
 const symbol=roleSymbols[role];
 if(!symbol)return '';
 return '<span class="role-pictogram '+extraClass+'" aria-hidden="true"><img src="pictograms/'+symbol.id+'.svg" alt="" width="64" height="64"></span>';
}
function pictogramGallery(){return '<section class="design-notes-section"><h2>표정으로 만나는 여섯 가지 역할.</h2><p class="pictogram-intro">이모지의 둥근 얼굴과 친근한 표정을 참고해, 손짓과 소품으로 역할을 알아볼 수 있게 그렸어요.</p><div class="pictogram-gallery">'+Object.entries(roleSymbols).map(([role,symbol])=>'<article>'+rolePictogram(role)+'<h3>'+role+'</h3><p>'+symbol.meaning+'</p></article>').join('')+'</div></section>';}
