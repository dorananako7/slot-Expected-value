
'use strict';
/** 出典表に掲載されたG数とEV値の組。2点間のみ線形補間し範囲外は表示しない。 */
function rows(xText, equalText, cashText) {
 const x=xText.trim().split(/\s+/).map(Number), a=equalText.trim().split(/\s+/).map(Number), b=cashText.trim().split(/\s+/).map(Number);
 if (x.length!==a.length||x.length!==b.length||x.some(v=>!Number.isFinite(v))||a.some(v=>!Number.isFinite(v))||b.some(v=>!Number.isFinite(v))) throw new Error('期待値表データの件数が一致しません');
 return x.map((game,i)=>({game,equal:a[i],cash:b[i]}));
}
const X16='0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750';
const X24='0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000 1050 1100 1150';
const X30='0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000 1050 1100 1150 1200 1250 1300 1350 1400 1450';
const SOURCES={
 store:{url:'https://www.p-world.co.jp/kochi/123harimayabashi.htm',name:'P-WORLD：123＋Nはりまや橋店 設置機種・貸しメダル',date:'2026-11-04'},
 kabaneri2:{url:'https://nana-press.com/kaiseki/machine/1097/35403/',name:'なな徹：カバネリ 海門決戦 天井・期待値（暫定版）',date:'2026-10-16'},
 tensei2:{url:'https://nana-press.com/kaiseki/machine/1059/33018/',name:'なな徹：北斗の拳 転生の章2 天井・期待値',date:'2026-03-17'},
 sao2:{url:'https://nana-press.com/kaiseki/machine/1158/37243/',name:'なな徹：SAO II 天井・期待値（暫定版）',date:'2026-10-27'},
 gi:{url:'https://www.nankaikoya.jp/g1gold-kitaichi/',name:'ぽこすろっと：GI優駿倶楽部 黄金 天井期待値表',date:'2025-03-22'},
 giCeiling:{url:'https://p.hisshobon.jp/machine/4233/1/100693',name:'パチ＆スロ必勝本：GI優駿倶楽部黄金 天井',date:'編集部調べ'},
 monkey:{url:'https://nana-press.com/kaiseki/machine/644/18016/',name:'なな徹：モンキーターンV 天井・期待値',date:'2026-08-21'},
 hokuto:{url:'https://nana-press.com/kaiseki/machine/514/13775/',name:'なな徹：スマスロ北斗の拳 天井・期待値',date:'2024-09-20'},
 tokyo:{url:'https://nana-press.com/kaiseki/machine/889/27250/',name:'なな徹：L 東京喰種 天井・期待値',date:'2026-10-13'},
 magi:{url:'https://nana-press.com/kaiseki/machine/914/28426/',name:'なな徹：マギアレコード 天井・期待値（暫定版）',date:'2026-08-19'},
 vvv:{url:'https://nana-press.com/kaiseki/machine/1040/32805/',name:'なな徹：革命機ヴァルヴレイヴ2 天井・期待値（暫定版）',date:'2026-10-15'},
 kaguya:{url:'https://nana-press.com/kaiseki/machine/804/23721/',name:'なな徹：かぐや様は告らせたい 天井・期待値',date:'2025-07-03'},
 god:{url:'https://nana-press.com/kaiseki/machine/767/22716/',name:'なな徹：ゴッドイーター リザレクション 天井・期待値（暫定版）',date:'2025-07-24'},
 karakuri:{url:'https://nana-press.com/kaiseki/machine/571/21225/',name:'なな徹：からくりサーカス 天井・期待値',date:'2025-10-31'},
 otome:{url:'https://nana-press.com/kaiseki/machine/597/16395/',name:'なな徹：戦国乙女4 天井・期待値',date:'2026-08-28'}
};
const MACHINES=[

 {id:'kabaneri2',title:'スマスロ 甲鉄城のカバネリ 海門決戦',maker:'サミー',short:'カバ',color:'#285b78',type:'実ゲーム数（ST間）',spins:31.0,source:'kabaneri2',aliases:'カバネリ2 かばねり 海門 うなと',facts:[['G数天井','通常996G / 設定変更後596G'],['周期天井','通常最大6周期 / 短縮時最大4周期'],['天井恩恵','エピソードボーナス→ST突入濃厚'],['短縮契機','設定変更後、通常ST駆け抜け後、景之ST終了後']],scenarios:[
  {id:'normal',label:'通常（ST後）',cap:996,kind:'ST間実G',note:'最大996Gまたは6周期。出典の公開表を使用します。周期到達やモード差は個別補正できません。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950','-1564 -1347 -1106 -840 -544 -215 149 552 1000 1496 2046 2656 3333 4083 4915 5838 6861 7995 9253 10648','-2857 -2640 -2399 -2132 -1836 -1508 -1144 -740 -293 203 754 1364 2040 2791 3623 4545 5568 6702 7960 9355')},
  {id:'reset',label:'リセット・短縮時（596G）',cap:596,kind:'ST間実G',note:'設定変更または短縮契機の確証がある場合のみ。周期数や当選前兆によって条件は変わります。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550','1000 1496 2046 2656 3333 4083 4915 5838 6861 7995 9253 10648','-293 203 754 1364 2040 2791 3623 4545 5568 6702 7960 9355')}
 ]},
 {id:'tensei2',title:'スマスロ 北斗の拳 転生の章2',maker:'サミー',short:'転生',color:'#7b4a3e',type:'出典のG数換算',spins:31.5,source:'tensei2',aliases:'ほくと てんせい2 あべし',facts:[['あべし天井','通常最大1536あべし / リセット最大1280あべし'],['公開表の換算','1G=1.5あべしで推定した打ち出し実G'],['天井恩恵','通常：AT＋ATレベル3以上 / リセット：AT'],['注意','内部あべしの加算により実機表示とのずれがあり得ます']],scenarios:[
  {id:'normal',label:'通常（G換算表）',cap:1000,kind:'出典換算G',note:'出典は1G＝1.5あべしとした約1000G天井のシミュレーション。液晶あべし数をそのまま入力しないでください。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950','-1332 -1185 -1019 -830 -616 -373 -98 214 568 969 1424 1940 2526 3189 3941 4795 5762 6859 8103 9514','-2434 -2288 -2123 -1936 -1723 -1482 -1209 -899 -548 -149 303 815 1396 2055 2802 3649 4610 5699 6934 8335')},
  {id:'reset',label:'設定変更後（G換算表）',cap:850,kind:'出典換算G',note:'出典は1G＝1.5あべし、約850G天井として試算。リセット確証が必要です。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800','-1348 -1148 -922 -665 -373 -43 332 757 1238 1785 2404 3106 3903 4806 5831 6992 8309','-2398 -2199 -1972 -1715 -1424 -1093 -719 -294 188 734 1354 2056 2853 3756 4780 5942 7259')}
 ]},
 {id:'sao2',title:'スロット ソードアート・オンラインII',maker:'大都技研',short:'SAO',color:'#42709d',type:'AT間実G',spins:31,source:'sao2',aliases:'SAO2 ソードアートオンライン2',facts:[['AT間天井','最大1200G+αでAT'],['CZ間天井','通常499G+α / 設定変更時256G+α（実G）'],['液晶CZ天井','最大800G+α、モードで短縮あり'],['試算の注意','AT間期待値は暫定版・CZ天井など未考慮']],scenarios:[
  {id:'normal',label:'AT間（暫定表）',cap:1200,kind:'AT間実G',note:'出典の設定1・暫定シミュレーション値。CZ天井、内部モード、閉店欠損は未考慮。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000 1050 1100 1150','-1329 -1239 -1137 -1022 -892 -745 -578 -390 -177 64 336 644 992 1386 1831 2334 2903 3546 4273 5096 6026 7077 8265 9610','-2522 -2432 -2330 -2215 -2084 -1937 -1770 -1582 -1369 -1128 -856 -548 -200 193 638 1142 1710 2354 3081 3903 4833 5884 7073 8417')},
  {id:'reset',label:'設定変更後 CZ間256G（期待値未収録）',cap:256,kind:'CZ間実G',note:'リセット後CZ間天井は256G+α。ただし本資料にCZ間専用の期待値表がないため算出できません。',table:null}
 ]},
 {id:'gi',title:'GI優駿倶楽部 黄金',maker:'コナミアミューズメント',short:'GI',color:'#ad494b',type:'通常時G',spins:35,source:'gi',ceilingSource:'giCeiling',throughMax:5,aliases:'ジーワン 競馬 黄金',facts:[['G数天井','333 / 555 / 777 / 999 / 1111G+αのいずれか'],['最深到達時','1111G天井はボーナス＋AT'],['スルー天井','ボーナス最大5連続スルー→次回AT濃厚'],['リセット','555G以下が高選択率。ただし最深1111Gの可能性は残る']],scenarios:[
  {id:'normal',label:'通常（平均状態・G数狙い）',cap:1111,kind:'G',note:'通常時の333/555/777/999/1111Gのいずれか。EV表は状態不問の平均値で、スルー別ではありません。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000 1050 1100','-612 -567 -512 -446 -368 -279 -171 -37 117 306 530 798 1116 1497 1955 2490 3127 3903 4834 5926 7244 8758 10468','-1558 -1509 -1454 -1389 -1314 -1220 -1112 -979 -824 -635 -418 -149 170 552 1001 1543 2188 2948 3874 4980 6298 7783 9486')},
  {id:'reset',label:'設定変更後（リセット）',cap:1111,kind:'G',note:'リセット時は555G以下が選ばれやすい一方、最大1111Gの振り分けもあります。対応する独立した公開期待値表は今回未収録。',table:null}
 ]},
 {id:'monkey',title:'スマスロ モンキーターンV',maker:'山佐',short:'V',color:'#238b9d',type:'AT間G',spins:32,source:'monkey',aliases:'モンキーターン5 競艇',facts:[['G数天井','通常795G+α / 短縮495G+α'],['周期天井','通常最大6周期 / 短縮最大4周期'],['天井恩恵','AT「SG RUSH」当選'],['短縮契機','設定変更時・青島VS波多野敗北後']],scenarios:[
  {id:'normal',label:'通常（AT後）',cap:795,kind:'G',note:'AT間ゲーム数の公開期待値表。周期数・モードは個別には指定できません。',table:rows(X16,'-600 -453 -281 -81 152 424 740 1108 1537 2036 2617 3295 4084 5002 6072 7319','-1540 -1392 -1220 -1020 -787 -516 -200 168 597 1096 1678 2355 3144 4063 5133 6379')},
  {id:'reset',label:'リセット・短縮時',cap:495,kind:'G',note:'設定変更後・青島VS波多野敗北後の短縮時に対応。短縮が確認できた場合のみ選択。',table:rows('0 50 100 150 200 250 300 350 400 450','740 1108 1537 2036 2617 3295 4084 5002 6072 7319','-200 168 597 1096 1678 2355 3144 4063 5133 6379')}
 ]},
 {id:'hokuto',title:'スマスロ 北斗の拳',maker:'サミー',short:'北斗',color:'#b46c40',type:'通常時G',spins:34.7,source:'hokuto',aliases:'ほくと',facts:[['G数天井','通常1268G+α / リセット800G+α'],['恩恵','バトルボーナス当選'],['天井短縮抽選','300 / 777 / 800Gで短縮抽選あり'],['出典EVの条件','天井短縮抽選の恩恵は未考慮']],scenarios:[
  {id:'normal',label:'通常（天井短縮なし）',cap:1268,kind:'G',note:'300/777/800Gの天井短縮抽選は期待値に入っていません。設定1相当。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 1000 1050 1100 1150','-996 -936 -867 -789 -700 -600 -486 -357 -211 -45 143 357 598 873 1183 1536 4145 4893 5742 6705','-2073 -2013 -1944 -1866 -1778 -1678 -1565 -1436 -1291 -1125 -938 -725 -484 -211 98 450 3049 3795 4641 5600')},
  {id:'reset',label:'設定変更後（800G短縮）',cap:800,kind:'G',note:'設定変更による800G天井短縮が確認できた台向け。',table:rows(X16,'-723 -492 -230 67 404 786 1220 1711 2268 2899 3615 4427 5347 6391 7574 8915','-1711 -1483 -1224 -930 -597 -219 209 694 1245 1869 2576 3379 4288 5320 6489 7815')}
 ]},
 {id:'tokyo',title:'L 東京喰種',maker:'スパイキー',short:'喰種',color:'#37455b',type:'AT間G / CZ間G',spins:31,source:'tokyo',aliases:'とうきょうぐーる 東京グール',facts:[['AT間天井','1200G+α（実G）でAT'],['CZ間天井','通常600G+α / リセット200G+αでCZ'],['注意','AT間とCZ間は別カウンター。混同しない'],['出典の前提','モード・喰ポイント等は平均または未考慮']],scenarios:[
  {id:'at',label:'AT間（通常・リセット共通表）',cap:1200,kind:'AT間G',note:'AT初当たりからの実ゲーム数です。リセット後の独立したAT間表ではありません。',table:rows(X24,'-815 -718 -609 -486 -347 -191 -14 184 408 661 945 1266 1628 2035 2495 3013 3597 4255 4997 5833 6775 7838 9036 10386','-2091 -1994 -1885 -1762 -1623 -1467 -1290 -1092 -868 -615 -331 -10 352 760 1219 1737 2321 2979 3721 4557 5500 6562 7760 9110')},
  {id:'cz',label:'CZ間（通常）',cap:600,kind:'CZ間G',note:'CZ間Gを入力。CZ到達はAT当選確約ではありません。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550','-1018 -773 -485 -144 257 729 1286 1942 2714 3625 4698 5963','-1817 -1572 -1283 -943 -542 -69 487 1143 1916 2827 3900 5164')},
  {id:'czReset',label:'CZ間（設定変更後）',cap:200,kind:'CZ間G',note:'リセット確定時のCZ間G。リセットされていない場合は適用できません。',table:rows('0 20 40 60 80 100 120 140 160 180','257 603 973 1368 1790 2240 2722 3235 3784 4369','-279 68 438 833 1255 1705 2186 2700 3249 3834')}
 ]},
 {id:'magi',title:'スマスロ マギアレコード',maker:'ミズホ',short:'マギ',color:'#9b5ca4',type:'ボーナス間G',spins:32.6,source:'magi',aliases:'まどか まぎれこ',facts:[['通常天井','950pt+α（約600G換算）'],['リセット','600～699pt+αに短縮（約400G換算での出典表）'],['天井恩恵','ボーナス当選'],['注意','液晶ptとG数は別。出典は1G=1.5pt換算']],scenarios:[
  {id:'normal',label:'通常（G数換算）',cap:600,kind:'換算G',note:'公開期待値表は1G=1.5ptの換算Gを使用。実際の獲得ptを反映していません。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550','-1272 -1091 -872 -608 -291 91 551 1104 1771 2574 3541 4706','-1927 -1745 -1526 -1263 -946 -564 -104 450 1117 1920 2887 4051')},
  {id:'reset',label:'設定変更後（G数換算）',cap:400,kind:'換算G',note:'公開表は短縮天井400G相当の近似モデルです。実際のptには変動があります。',table:rows('0 50 100 150 200 250 300 350','-1103 -721 -261 293 959 1762 2730 3894','-1671 -1289 -829 -275 392 1195 2162 3327')}
 ]},
 {id:'vvv',title:'革命機ヴァルヴレイヴ2',maker:'SANKYO',short:'VVV2',color:'#9d343e',type:'ボーナス・AT間G',spins:32.7,source:'vvv',throughMax:3,aliases:'ヴヴヴ2 ヴァルヴレイヴ ばるぶれいぶ2',facts:[['ボーナス・AT天井','通常1500G / リセット1000G'],['CZ・周期天井','CZ間999G / 最大6周期（リセット時最大3周期）'],['スルー天井','決戦ボーナス3連続スルー後のボーナスで革命ボーナス濃厚'],['出典の前提','ボーナス・AT後66Gヤメ、内部モード/周期天井未反映']],scenarios:[
  {id:'normal',label:'通常（ボーナス・AT間）',cap:1500,kind:'間G',note:'CZ・周期天井・決戦ボーナススルー回数は期待値表に反映していません。暫定表。',table:rows(X30,'-1454 -1373 -1284 -1186 -1078 -958 -825 -679 -517 -338 -141 78 319 586 880 1206 1566 1963 2403 2888 3425 4018 4673 5397 6197 7081 8058 9137 10330 11648','-2858 -2777 -2689 -2590 -2482 -2362 -2229 -2083 -1921 -1742 -1545 -1326 -1085 -818 -524 -198 162 559 999 1484 2021 2614 3269 3993 4793 5677 6653 7733 8926 10244')},
  {id:'reset',label:'設定変更後（短縮）',cap:1000,kind:'間G',note:'設定変更が確実なときのみ。周期天井等は期待値表に反映していません。暫定表。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950','-1323 -1104 -863 -596 -302 24 384 781 1221 1706 2243 2836 3491 4215 5015 5899 6876 7955 9148 10466','-2600 -2382 -2140 -1874 -1579 -1253 -894 -496 -57 429 965 1558 2213 2937 3737 4621 5598 6678 7870 9189')}
 ]}
,
 {id:'kaguya',title:'スマスロ かぐや様は告らせたい',maker:'SANKYO',short:'かぐや',color:'#a13e72',type:'ボーナス間G',spins:31,source:'kaguya',throughMax:7,aliases:'かぐや様 かぐやさま',facts:[['BIG後','1100G+αでBIG以上'],['REG後','900G+αでBIG以上'],['設定変更時','800G+αでBIG以上'],['CZスルー天井','CZ最大7連続スルー→次回CZでBIG以上']],scenarios:[
  {id:'big',label:'BIG後（通常）',cap:1100,kind:'ボーナス間G',note:'BIG後の表。ボーナス種別が確認できた場合のみ選択。CZスルー回数は個別計算していません。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000 1050','-1178 -1075 -958 -825 -673 -500 -302 -77 179 471 803 1182 1613 2105 2666 3304 4031 4860 5804 6880 8105 9502','-2303 -2201 -2084 -1951 -1800 -1628 -1432 -1208 -953 -663 -332 45 474 963 1521 2156 2879 3704 4643 5713 6932 8322')},
  {id:'reg',label:'REG後（天井900G）',cap:900,kind:'ボーナス間G',note:'REG後の表。ボーナス種別が確認できた場合のみ選択。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850','-1062 -883 -680 -447 -183 119 462 854 1299 1808 2386 3046 3797 4653 5629 6740 8006 9449','-2148 -1971 -1769 -1538 -1276 -977 -636 -248 194 697 1271 1925 2670 3519 4487 5588 6844 8274')},
  {id:'reset',label:'設定変更後（800G）',cap:800,kind:'ボーナス間G',note:'設定変更が確認できた台だけに適用。CZスルー数による差は未反映。',table:rows(X16,'-956 -719 -448 -139 212 613 1069 1589 2182 2857 3626 4502 5500 6638 7934 9410','-2016 -1781 -1513 -1207 -860 -463 -12 503 1089 1756 2517 3384 4372 5497 6779 8240')}
 ]},
 {id:'god',title:'スマスロ ゴッドイーター リザレクション',maker:'山佐ネクスト',short:'GE',color:'#797a51',type:'通常時G',spins:31,source:'god',aliases:'ゴッドイーター りざれくしょん',facts:[['ゲーム数天井','通常1000G+α / 短縮600G+α'],['天井恩恵','AT「アラガミバースト」'],['天井短縮条件','設定変更または上位ST「漆黒の捕喰者」終了後'],['資料の状態','期待値はいずれも暫定版']],scenarios:[
  {id:'normal',label:'通常（1000G）',cap:1000,kind:'通常時G',note:'設定1・暫定公開表です。通常時ゾーン差などは考慮されていません。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950','-1235 -1105 -956 -786 -591 -370 -117 172 501 877 1306 1795 2354 2992 3720 4550 5498 6580 7815 9224','-2319 -2189 -2041 -1872 -1679 -1459 -1208 -921 -594 -220 206 692 1247 1881 2604 3430 4372 5447 6673 8074')},
  {id:'reset',label:'設定変更・短縮後（600G）',cap:600,kind:'通常時G',note:'設定変更後／漆黒の捕喰者後の短縮時のみ。暫定版。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550','-650 -232 244 789 1410 2118 2927 3850 4904 6106 7479 9045','-1622 -1211 -742 -207 404 1101 1897 2805 3841 5024 6373 7914')}
 ]},
 {id:'karakuri',title:'スマスロ からくりサーカス',maker:'SANKYO',short:'からくり',color:'#b56d4c',type:'液晶表示G',spins:32.9,source:'karakuri',aliases:'からくり さーかす',facts:[['G数天井','液晶表示1200G+α、モードで800/100G等も'],['恩恵','CZ または AT'],['スルー天井','CZ4連続失敗後5回目でAT直撃に書換'],['AT間天井','AT間2500G+αでAT＋成功確定の激情ジャッジ']],scenarios:[
  {id:'normal',label:'通常（液晶表示G数）',cap:1200,kind:'液晶G',note:'実ゲーム数ではなく液晶上のG数を入力。液晶で加算されるため実ゲーム数と一致しません。CZスルー/AT間は平均化。',table:rows(X24,'-1920 -1640 -1338 -1014 -664 -288 117 553 1022 1527 2070 2655 3285 3963 4692 5477 6322 7232 8211 9265 10399 11620 13043 14405','-3550 -3271 -2971 -2647 -2299 -1924 -1521 -1087 -620 -117 424 1007 1634 2309 3036 3818 4660 5566 6541 7591 8721 9937 11343 12705')}
 ]},
 {id:'otome',title:'L 戦国乙女4',maker:'オリンピアエステート',short:'乙女',color:'#bd7680',type:'ボーナス間G',spins:31.8,source:'otome',throughMax:6,aliases:'戦国乙女4 せんごくおとめ',facts:[['G数天井','モード別に99 / 349 / 649 / 799G+α'],['最深到達時','ボーナス当選'],['スルー天井','6連続AT非当選→次回7回目でAT確定のEPB'],['リセット','スルー天井再セット。G数の独立した公開表は未収録']],scenarios:[
  {id:'normal',label:'通常（モード平均）',cap:799,kind:'ボーナス間G',note:'設定1のモード不問の公開表。スルー回数・モード・巫女カウンターは個別には未反映。',table:rows('0 50 100 150 200 250 300 350 400 450 500 550 600 650 700','-462 -353 -223 -68 115 333 592 899 1264 1698 2213 2825 3552 4415 5441','-1331 -1221 -1091 -937 -753 -535 -277 31 396 830 1345 1957 2683 3547 4572')},
  {id:'reset',label:'設定変更後（表未収録）',cap:799,kind:'ボーナス間G',note:'リセット時のスルー回数再セットによる差を表に反映できないため期待値は未算出。',table:null}
 ]}

];
// 出典：P-WORLD「１２３＋Nはりまや橋店」2026-11-04更新。
// 各行: [掲載機種名, 貸しメダル (47/160), 期待値解析モデルid または null]
const VENUE_ROSTER=[["ゴーゴージャグラー3","47",null],["ネオアイムジャグラーEX","47",null],["マイジャグラーVI","47",null],["マイジャグラーV","47",null],["ファンキージャグラー2","47",null],["ハッピージャグラーV III","47",null],["ミスタージャグラー","47",null],["ジャグラーガールズSS","47",null],["ウルトラミラクルジャグラー","47",null],["スマスロ 甲鉄城のカバネリ 海門決戦","47/160","kabaneri2"],["L 東京喰種","47/160","tokyo"],["スマスロ リコリス・リコイル","47",null],["スマスロ ミリオンゴッド-神々の軌跡-","47/160",null],["L 戦国乙女5 業火を穿つ宿焔の双刃","47/160",null],["スマスロ モンキーターンV","47/160","monkey"],["スロット ソードアート・オンラインII","47","sao2"],["L 聖闘士星矢 黄金十二宮","47",null],["スマスロ 獣王","47/160",null],["スマスロ モンスターハンターライズ：サンブレイク","47/160",null],["L 革命機ヴァルヴレイヴ2","47/160","vvv"],["スマスロ とある魔術の禁書目録2","47/160",null],["真打 吉宗","47",null],["L ゴジラ対エヴァンゲリオン2","47/160",null],["L 青春ブタ野郎はバニーガール先輩の夢を見ない","47/160",null],["A-SLOT+ ディスクアップ ULTRAREMIX","47",null],["沖ドキ！BLACK","47",null],["戦国コレクション6","47/160",null],["スマスロ ラグナドール","47",null],["スマスロ モンスターハンターライズ","47/160",null],["L ソードアート・オンライン オルタナティブ ガンゲイル・オンライン","47",null],["スマスロ マギアレコード 魔法少女まどか☆マギカ外伝","47/160","magi"],["スロット Vivy -Fluorite Eye’s Song-","47",null],["スマスロ 北斗の拳","47","hokuto"],["L 魔法少女にあこがれて","47/160",null],["L 炎炎ノ消防隊2","47/160",null],["L 彼女、お借りします","47/160",null],["スマスロ やじきた道中記参る！","47/160",null],["L ToLOVEるダークネス TRANCE ver.8.7","47/160",null],["スマスロ サンダーV","47",null],["スマスロ 攻殻機動隊","47/160",null],["L 南国育ち SPECIAL","47",null],["L 邪神ちゃんドロップキック","47",null],["スマスロ パリピ孔明","47",null],["スマスロ ゴッドイーター リザレクション","47","god"],["スマスロ とんでもスキルで異世界放浪メシ","47",null],["チバリヨ2","47",null],["アレックス ブライト","47",null],["スマスロ タコスロ","47",null],["クレアの秘宝伝 ボーナストリガーver.","47",null],["スマスロ ハナビ","47",null],["スマスロ シャーマンキング","47",null],["スマスロ 北斗の拳 転生の章2","47/160","tensei2"],["新ハナビ","47",null],["モグモグ風林火山 大海戦の巻","47",null],["L 喰霊-零-Re","47",null],["L うみねこのなく頃に2","47",null],["アニマルスロット ドッチ","47",null],["L 不二子BT","47",null],["スマスロ ケロット5BT","47",null],["SHAKE BONUS TRIGGER","47",null],["A-SLOT+ 異世界かるてっとBT","47",null],["スロット ワールドダイスター","47",null],["ニューパルサーSP4 with 太鼓の達人","47",null],["バーサスリヴァイズ","47",null],["クランキークレスト","47",null],["パチスロ ディスクアップ2","47",null],["パチスロ 交響詩篇エウレカセブン HI-EVOLUTION ZERO TYPE-ART","47",null],["L 転生王女と天才令嬢の魔法革命","47",null],["七つの魔剣が支配する","47",null],["L 牙狼 闇を照らす者","47",null],["L ルパン三世 大航海者の秘宝","47",null],["L バンドリ！","47",null],["スマスロ 鉄拳6","47/160",null],["スマスロ バイオハザード5","47/160",null],["L ダンベル何キロ持てる？","47",null],["L タクトオーパス デスティニー","47",null],["L ダーリン・イン・ザ・フランキス","47",null],["スロット ゾンビランドサガ","47",null],["L シン・エヴァンゲリオン","47",null],["Sister Quest","47",null],["L アズールレーン THE ANIMATION","47/160",null],["LB ヱヴァンゲリヲン ～約束の扉～","47",null],["吉宗","47",null],["スマスロ バジリスク～甲賀忍法帖～絆2 天膳 BLACK EDITION","47",null],["いざ！番長","47",null],["スマスロ 痛いのは嫌なので防御力に極振りしたいと思います。","47",null],["スマスロ 東京リベンジャーズ","47",null],["スマスロ 化物語","47",null],["L からくりサーカス2","160",null],["L 虚構推理","160",null],["スマスロ スーパーリオエース2","160",null],["スマスロ BIRDIE WING -Golf Girls’ Story-","160",null],["スマスロ デビル メイ クライ5 スタイリッシュトライブ","160",null],["スマスロ キングパルサー","160",null]];
const STORE_MODEL_IDS=new Set(VENUE_ROSTER.map(v=>v[2]).filter(Boolean));
const VENUE_COUNT=VENUE_ROSTER.length;
const P_WORLD_DATE='2026-11-04';
for (const [title,rates,existingId] of VENUE_ROSTER) {
 const id=existingId||('venue-'+VENUE_ROSTER.findIndex(v=>v[0]===title));
 if(existingId) {const m=MACHINES.find(x=>x.id===id);if(m){m.venueRates=rates;m.venueListed=true}continue;}
 MACHINES.push({id,title,maker:'設置情報：P-WORLD',short:title.replace(/^(スマスロ|スロット|L|A-SLOT\+|LB)\s*/,'').slice(0,2),color:'#6d819e',type:'公開天井情報未収録',spins:null,source:'store',aliases:title,venueRates:rates,venueListed:true,facts:[['当店の設置一覧','P-WORLD（2026/11/04掲載）。貸しメダル：1000円/'+(rates==='47/160'?'47枚・160枚':rates==='47'?'47枚':'160枚')],['天井・期待値','本サイトでは信頼できる機種別表を未収録。推測の金額を表示しません。']],scenarios:[{id:'unavailable',label:'期待値・天井は未収録',cap:null,kind:'要照合',note:'当店での設置掲載は確認できましたが、機種別天井・期待値は未収録です。公開表を捏造しないため金額表示は無効です。',table:null}]});
}

const $=id=>document.getElementById(id);
const storageKey='slot123-harimaya-v2';
let persisted={};try{persisted=JSON.parse(localStorage.getItem(storageKey)||'{}')||{}}catch(_){persisted={}}
let state={id:MACHINES.some(m=>m.id===persisted.lastMachine)?persisted.lastMachine:'kabaneri2',scenario:persisted.scenario||'normal',games:0,exchange:'equal',loan:persisted.loan==='160'?'160':'47',through:0,prelude:false,store:'123＋Nはりまや橋店',installed:Array.isArray(persisted.installed)?persisted.installed:[],favorites:Array.isArray(persisted.favorites)?persisted.favorites:[],history:Array.isArray(persisted.history)?persisted.history:[],filter:'venue',search:''};
function persist(){try{localStorage.setItem(storageKey,JSON.stringify({lastMachine:state.id,scenario:state.scenario,store:state.store,installed:state.installed,favorites:state.favorites,history:state.history,loan:state.loan}))}catch(e){toast('保存領域に書き込めませんでした')}}
function activeMachine(){return MACHINES.find(m=>m.id===state.id)||MACHINES[0]}
function activeScenario(){const m=activeMachine();return m.scenarios.find(s=>s.id===state.scenario)||m.scenarios[0]}
const yen=n=>Math.round(n).toLocaleString('ja-JP');
const signed=n=>(n>0?'+':n<0?'−':'')+yen(Math.abs(n));
const safeNumber=(v,max)=>Math.max(0,Math.min(max,Math.round(Number(v)||0)));
function evAt(table,game,exchange){if(!table||!table.length)return null;if(game<table[0].game||game>table[table.length-1].game)return null;const found=table.find(p=>p.game===game);if(found)return {value:found[exchange],interpolated:false};for(let i=1;i<table.length;i++){if(game<table[i].game){const a=table[i-1],b=table[i],p=(game-a.game)/(b.game-a.game);return {value:Math.round(a[exchange]+(b[exchange]-a[exchange])*p),interpolated:true}}}return null}
function textNode(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;n.textContent=text;return n}
let toastTimer;function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
function scenarioChanged(){
 const m=activeMachine(),s=activeScenario();
 $('counterType').textContent=s.kind+' を入力';
 $('extraCondition').hidden=!m.throughMax;
 $('conditionInfo').textContent=s.note;
 $('secondaryInfo').textContent=Number.isFinite(s.cap)?('天井計算上の到達基準：'+s.cap.toLocaleString()+' G（前兆・周期などは別）'):'天井・必要G数は未収録です。';
 $('games').max=20000;renderResult();
}
function updateMachine(){
 const m=activeMachine();
 $('chosenGlyph').textContent=m.short;$('chosenGlyph').style.background='linear-gradient(140deg,'+m.color+',#448cf3)';
 $('chosenName').textContent=m.title;
 $('chosenSubtitle').textContent=(m.venueListed?'✓ 当店掲載 '+m.venueRates+'枚貸':'当店掲載なし')+' ・ '+(m.scenarios.some(s=>s.table)?'解析期待値表あり':'期待値表 未収録');
 $('machineGenre').textContent=m.type;
 $('toggleInstalled').classList.toggle('active',state.installed.includes(m.id));
 $('toggleInstalled').textContent=state.installed.includes(m.id)?'✓ 現地で確認済み（メモ）':'＋ 現地で確認した台として記録';
 $('toggleFavorite').classList.toggle('active',state.favorites.includes(m.id));
 $('toggleFavorite').textContent=state.favorites.includes(m.id)?'★ お気に入り':'☆ お気に入り';
 const select=$('scenario');select.replaceChildren(...m.scenarios.map(s=>{const o=document.createElement('option');o.value=s.id;o.textContent=s.label;return o}));
 if(!m.scenarios.some(s=>s.id===state.scenario))state.scenario=m.scenarios[0].id;select.value=state.scenario;
 $('through').max=m.throughMax||0;state.through=0;$('through').value='0';
 const facts=$('ceilingFacts');facts.replaceChildren(...m.facts.map(([t,desc])=>{const li=document.createElement('li');li.append(textNode('strong','',t),textNode('small','',desc));return li}));
 $('machineSourceDetail').href=SOURCES[m.ceilingSource||m.source].url;
 $('machineSourceDetail').textContent=m.source==='store'?'↗ この店舗の設置一覧を見る':'↗ 機種の天井・解析を読む';
 $('storeName').textContent='123＋Nはりまや橋店';renderInstalledCount();scenarioChanged();persist();
}
function renderInstalledCount(){
 $('installedCount').textContent=VENUE_COUNT+'機種（名称別）';
 $('machineCountLabel').textContent=VENUE_COUNT+'機種掲載 / '+STORE_MODEL_IDS.size+'機種に解析表';
 $('storeButton').textContent='⌖ 123＋Nはりまや橋店';
}
function renderResult(){
 const m=activeMachine(),s=activeScenario(),g=state.games;
 // 元表は通常貸しの想定。低貸し（160枚）は金額の表示を禁じる。
 const useLow=state.loan==='160',lowUnavailable=useLow&&!(m.venueRates||'').includes('160');
 const e=evAt(s.table,g,state.exchange);
 const hasCap=Number.isFinite(s.cap),over=hasCap&&g>=s.cap;
 const invalid=state.prelude||over||useLow;
 const show=!!e&&!invalid;
 const panel=$('resultBody');panel.classList.toggle('empty',!show);
 $('evValue').innerHTML=show?(signed(e.value)+' <small>円</small>'):'-- <small>円</small>';
 $('evSignal').textContent=state.prelude?'本前兆など出典前提と異なります':useLow?'160枚貸しは円換算できません':over?'天井域・入力G数を確認':!s.table?'公開期待値表は未収録':!e?'出典表の範囲外':e.value<0?'参考表上：マイナス':e.value<1500?'参考表上：プラス域':'参考表上：+1,500円以上';
 const notes=[];
 if(useLow){notes.push('この店舗の1,000円/160枚スロットは解析元の等価・5.6枚表とは貸しメダルが異なります。金額は換算・表示しません。');if(lowUnavailable)notes.push('この機種は160枚スロットへの掲載も確認できません。');}
 else if(state.prelude)notes.push('本前兆中など出典と条件が異なるため、参考値を無効にしています。');
 else if(over)notes.push('入力ゲーム数が表示対象の天井基準以上です。前兆・規定周期などを確認してください。');
 else if(!s.table)notes.push('天井・期待値の確認済み表がないため、推測金額は表示しません。');
 else if(!e)notes.push('出典表の範囲外です。外挿しません。');
 else notes.push(e.interpolated?'公開表の前後2点を直線補間した参考値です。':'解析媒体が掲載したG数の参考値です。');
 if(show)notes.push('※ これは当店の47枚貸し・実交換率での期待収支ではありません。実際の資金・閉店欠損等の差があります。');
 if(state.through>0)notes.push('※ '+state.through+'スルーによる条件差は今回の期待値に反映していません。');
 if(m.id==='magi'||m.id==='tensei2')notes.push('※ 液晶ポイントと実ゲーム数は別。出典が定めたG換算の仮定を使用。');
 $('evDesc').textContent=notes.join(' ');
 $('maxCeiling').innerHTML=hasCap?(yen(s.cap)+'<small> G相当</small>'):'—';
 const remaining=hasCap?Math.max(0,s.cap-g):null;
 $('gamesRemaining').innerHTML=remaining===null?'—':yen(remaining)+'<small> G相当</small>';
 const estimateAllowed=remaining!==null&&m.venueListed&&(m.venueRates||'').includes(state.loan)&&Number.isFinite(m.spins)&&m.spins>0&&!['karakuri','magi','tensei2'].includes(m.id);
 const loanCoins=state.loan==='160'?160:47;
 $('investment').innerHTML=estimateAllowed?(yen(Math.ceil((remaining/m.spins)*50*1000/loanCoins))+'<small> 円</small>'):'—';
 $('rateNotice').textContent=useLow?'160枚貸し：通常貸しの円期待値は適用できません。':'47枚貸し：解析元の20円等価・5.6枚交換の表とは条件が異なります。金額は直接の当店期待収支ではありません。';
 $('methodExplanation').textContent=(s.table?'解析元の公開表を参照'+(e&&e.interpolated?'し、隣接2点を線形補間。':'。'):'期待値表が未収録のため、金額は算出しません。')+(estimateAllowed?' 最深までの追加投資換算は残りG÷'+m.spins+'G/50枚×1,000円の単純な目安で、平均投資・予算上限ではありません。':' 投資換算は条件不一致のため表示しません。');
 const srcInfo=SOURCES[m.source];$('sourceLink').replaceChildren();const a=document.createElement('a');a.href=srcInfo.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=m.source==='store'?'↗ 店舗の機種一覧で確認':'↗ 解析表の原文と前提を確認';$('sourceLink').append(a);
 $('saveResult').disabled=!show;
 renderChart();
}
function renderChart(){const {table}=activeScenario();const root=$('chartArea');root.replaceChildren();if(!table||state.loan==='160'){root.append(textNode('p','subtle',state.loan==='160'?'160枚貸しには公開表の金額を適用できません。':'この条件の公開期待値表はありません。'));$('chartMin').textContent='—';$('chartMax').textContent='—';return}const min=Math.min(0,...table.map(x=>x[state.exchange])),max=Math.max(0,...table.map(x=>x[state.exchange])),range=max-min||1;table.forEach((v,i)=>{const b=document.createElement('div');b.className='bar'+(v[state.exchange]<0?' neg':'')+(Math.abs(state.games-v.game)<=24?' current':'');b.style.height=(12+Math.abs(v[state.exchange])/Math.max(Math.abs(min),Math.abs(max),1)*74)+'px';b.title=v.game+'G：'+signed(v[state.exchange])+'円';b.setAttribute('aria-label',b.title);root.append(b)});$('chartMin').textContent=table[0].game+'G';$('chartMax').textContent=table[table.length-1].game+'G'}
function selectMachine(id){if(!MACHINES.some(x=>x.id===id))return;state.id=id;state.scenario=activeMachine().scenarios[0].id;state.games=0;state.through=0;state.prelude=false;$('games').value='0';$('inPrelude').checked=false;updateMachine();closeModal('machineModal');window.scrollTo({top:0,behavior:'smooth'})}
function toggleArr(name,id){state[name]=state[name].includes(id)?state[name].filter(x=>x!==id):[...state[name],id];persist();updateMachine();renderMachines()}
function renderMachines(){
 const list=$('machineList'),term=state.search.trim().toLocaleLowerCase('ja-JP');list.replaceChildren();
 const machines=MACHINES.filter(m=>{
  const matches=!term||(m.title+' '+m.maker+' '+m.aliases).toLocaleLowerCase('ja-JP').includes(term);
  const matchesFilter=state.filter==='venue'?m.venueListed:state.filter==='ev'?m.venueListed&&m.scenarios.some(s=>!!s.table):state.filter==='favorites'?state.favorites.includes(m.id):true;
  return matches&&matchesFilter;
 }).sort((a,b)=>Number(b.scenarios.some(s=>!!s.table))-Number(a.scenarios.some(s=>!!s.table))||Number(b.venueListed)-Number(a.venueListed)||a.title.localeCompare(b.title,'ja'));
 if(!machines.length)list.append(textNode('p','subtle','該当機種はありません。検索語やフィルターを変更してください。'));
 for(const m of machines){
  const row=textNode('div','machine-item','');const ico=textNode('span','machine-glyph',m.short);ico.style.background=m.color;
  const main=textNode('button','machine-item-main','');main.type='button';main.append(textNode('strong','',m.title),textNode('small','',(m.venueListed?'P-WORLD掲載 '+m.venueRates+'枚':'当店掲載なし')+' ・ '+(m.scenarios.some(s=>!!s.table)?'参考期待値表あり':'表未収録')));
  main.addEventListener('click',()=>selectMachine(m.id));
  const installed=textNode('button','mark'+(state.installed.includes(m.id)?' on':''),state.installed.includes(m.id)?'✓':'＋');installed.type='button';installed.title='自分の現地確認メモ';installed.setAttribute('aria-label',m.title+'の現地確認メモを切り替え');installed.addEventListener('click',()=>toggleArr('installed',m.id));
  const fav=textNode('button','mark'+(state.favorites.includes(m.id)?' on':''),state.favorites.includes(m.id)?'★':'☆');fav.type='button';fav.setAttribute('aria-label',m.title+'のお気に入りを切り替え');fav.addEventListener('click',()=>toggleArr('favorites',m.id));
  row.append(ico,main,installed,fav);list.append(row);
 }
}
function openModal(id){$(id).classList.add('open');if(id==='machineModal'){$('machineSearch').value='';state.search='';renderMachines();setTimeout(()=>$('machineSearch').focus(),30)}else{$('storeInput').value=state.store;setTimeout(()=>$('storeInput').focus(),30)}}function closeModal(id){$(id).classList.remove('open')}
function renderSources(){const list=$('sourceIndex');list.replaceChildren();const used=['store','kabaneri2','tensei2','sao2','monkey','hokuto','tokyo','magi','vvv','god','gi','giCeiling','kaguya','karakuri','otome'];for(const id of used){const s=SOURCES[id];const a=document.createElement('a');a.href=s.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='↗ '+s.name;a.append(textNode('small','',s.date+' ・ 新しい情報は必ず元ページで確認'));list.append(a)}}
function renderHistory(){const list=$('savedList');list.replaceChildren();if(!state.history.length){list.append(textNode('p','subtle','まだ保存した台はありません。参考値が出たら「この台を保存」をタップしてください。'));return}for(const item of state.history){const machine=MACHINES.find(m=>m.id===item.id);if(!machine)continue;const b=textNode('button','saved-item','');b.type='button';b.append(textNode('strong','',machine.title+' ・ '+item.games+'G → '+signed(item.ev)+'円'),textNode('small','',item.scenario+' / '+(item.exchange==='equal'?'等価':'5.6枚現金')+' / '+item.at));b.addEventListener('click',()=>{state.id=item.id;state.scenario=machine.scenarios.some(s=>s.id===item.scenario)?item.scenario:machine.scenarios[0].id;state.games=item.games;state.exchange=item.exchange;state.through=item.through||0;state.prelude=false;$('games').value=state.games;$('inPrelude').checked=false;updateMachine();$('through').value=state.through;document.querySelectorAll('[data-rate]').forEach(x=>x.classList.toggle('active',x.dataset.rate===state.exchange));$('checker').scrollIntoView({behavior:'smooth',block:'start'});toast('保存した条件を復元しました')});list.append(b)}}
function resultText(){const m=activeMachine(),s=activeScenario(),e=evAt(s.table,state.games,state.exchange);return '【123 はりまや台チェック・参考】\n機種：'+m.title+'\n対象：'+s.label+'\nゲーム数：'+state.games+'G\n交換条件：'+(state.exchange==='equal'?'等価':'5.6枚交換')+'\n期待値（出典表/補間）：'+(e&&!state.prelude&&state.loan==='47'&&state.games<s.cap?signed(e.value)+'円（店舗換算ではない）':'算出不可')+'\n※出典の交換条件による参考値。当店の実交換条件は未換算。スルー回数は未反映。\n出典：'+SOURCES[m.source].url}
$('chooseMachine').addEventListener('click',()=>openModal('machineModal'));$('navMachines').addEventListener('click',()=>openModal('machineModal'));$('closeMachine').addEventListener('click',()=>closeModal('machineModal'));$('closeStore').addEventListener('click',()=>closeModal('storeModal'));$('storeButton').addEventListener('click',()=>{window.open(SOURCES.store.url,'_blank','noopener,noreferrer')});
['machineModal','storeModal'].forEach(id=>{$(id).addEventListener('click',e=>{if(e.target===$(id))closeModal(id)})});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal('machineModal');closeModal('storeModal')}});
$('saveStore').addEventListener('click',()=>{state.store='123＋Nはりまや橋店';$('storeName').textContent='123＋Nはりまや橋店';renderInstalledCount();persist();closeModal('storeModal');toast('店舗名を保存しました')});$('storeInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('saveStore').click()});
$('machineSearch').addEventListener('input',e=>{state.search=e.target.value;renderMachines()});document.querySelectorAll('[data-filter]').forEach(el=>el.addEventListener('click',()=>{state.filter=el.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===el));renderMachines()}));
$('toggleInstalled').addEventListener('click',()=>toggleArr('installed',state.id));$('toggleFavorite').addEventListener('click',()=>toggleArr('favorites',state.id));$('scenario').addEventListener('change',e=>{state.scenario=e.target.value;state.games=0;$('games').value='0';scenarioChanged();persist()});document.querySelectorAll('[data-rate]').forEach(el=>el.addEventListener('click',()=>{state.exchange=el.dataset.rate;document.querySelectorAll('[data-rate]').forEach(x=>x.classList.toggle('active',x===el));renderResult()}));
$('games').addEventListener('input',e=>{state.games=safeNumber(e.target.value,20000);if(e.target.value!==''&&+e.target.value!==state.games)e.target.value=state.games;renderResult()});$('games').addEventListener('blur',e=>{e.target.value=state.games});document.querySelectorAll('[data-step]').forEach(el=>el.addEventListener('click',()=>{state.games=safeNumber(state.games+Number(el.dataset.step),20000);$('games').value=state.games;renderResult()}));
function changeThrough(delta){state.through=safeNumber(state.through+delta,activeMachine().throughMax||0);$('through').value=state.through;renderResult()}$('minusThrough').addEventListener('click',()=>changeThrough(-1));$('plusThrough').addEventListener('click',()=>changeThrough(1));$('through').addEventListener('input',e=>{state.through=safeNumber(e.target.value,activeMachine().throughMax||0);e.target.value=state.through;renderResult()});$('inPrelude').addEventListener('change',e=>{state.prelude=e.target.checked;renderResult()});
$('saveResult').addEventListener('click',()=>{const s=activeScenario(),e=evAt(s.table,state.games,state.exchange);if(!e||state.prelude||state.loan==='160'||state.games>=s.cap)return;state.history.unshift({id:state.id,scenario:state.scenario,games:state.games,exchange:state.exchange,through:state.through,ev:e.value,at:new Date().toLocaleString('ja-JP')});state.history=state.history.slice(0,30);persist();renderHistory();toast('この台を保存しました')});$('copyResult').addEventListener('click',async()=>{const txt=resultText();try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(txt)}else{const el=document.createElement('textarea');el.value=txt;document.body.append(el);el.select();if(!document.execCommand('copy'))throw Error('copy unsupported');el.remove()}toast('結果をコピーしました')}catch(_){toast('コピーできませんでした。HTTPSで開いてください')}});
$('loan').addEventListener('change',e=>{state.loan=e.target.value;persist();renderResult()});$('loan').value=state.loan;
$('clearHistory').addEventListener('click',()=>{if(!state.history.length)return;if(confirm('保存した台をすべて消去しますか？')){state.history=[];persist();renderHistory();toast('履歴を削除しました')}});$('navCheck').addEventListener('click',()=>$('checker').scrollIntoView({behavior:'smooth'}));$('navHistory').addEventListener('click',()=>$('saved').scrollIntoView({behavior:'smooth'}));$('navSources').addEventListener('click',()=>$('sources').scrollIntoView({behavior:'smooth'}));$('openSources').addEventListener('click',()=>$('sources').scrollIntoView({behavior:'smooth'}));
renderSources();updateMachine();renderHistory();
