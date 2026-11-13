// Original geometric role pictograms inspired by sports wayfinding.
const roleSymbols = {"학생회 대표":{"id":"representative","meaning":"함께 나아갈 기준을 제안해요."},"AI 동아리 학생":{"id":"ai-student","meaning":"새로운 도구의 가능성을 탐색해요."},"국어 교사":{"id":"language-teacher","meaning":"읽고 생각하는 과정을 지켜요."},"학부모":{"id":"parent","meaning":"아이의 배움 곁에서 함께해요."},"정보 교과 교사":{"id":"computing-teacher","meaning":"도구를 이해하고 바르게 활용해요."},"상담 교사":{"id":"counselor","meaning":"서로의 마음과 이야기를 들어요."}};
function rolePictogram(role, extraClass='') {
 const symbol=roleSymbols[role];
 if(!symbol)return '';
 return '<span class="role-pictogram '+extraClass+'" aria-hidden="true"><img src="pictograms/'+symbol.id+'.svg" alt="" width="64" height="64"></span>';
}
function pictogramGallery(){return '<section class="design-notes-section"><h2>동작으로 읽는 여섯 가지 역할.</h2><p class="pictogram-intro">스포츠 픽토그램의 간결한 인체와 리듬을 바탕으로, 각 역할의 행동을 같은 비례와 선으로 그렸어요.</p><div class="pictogram-gallery">'+Object.entries(roleSymbols).map(([role,symbol])=>'<article>'+rolePictogram(role)+'<h3>'+role+'</h3><p>'+symbol.meaning+'</p></article>').join('')+'</div></section>';}
