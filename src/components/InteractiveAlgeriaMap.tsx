'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';
import ScrollReveal from './ScrollReveal';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, X, MapPin } from 'lucide-react';

interface ProjectHotspot {
  id: string;
  num: string;
  year: string;
  sector: string;
  name: string;
  nameEn: string;
  client: string;
  location: string;
  scope: string;
  scopeEn: string;
  image: string;
  leftPct: number;
  topPct: number;
}

const sectorColors: Record<string, { dot: string; tag: string; label: string; glow: string }> = {
  THT:   { dot: '#d4773b', tag: 'bg-[#d4773b] text-white',    label: 'THT / HT',        glow: 'rgba(212,119,59,0.55)' },
  GIS:   { dot: '#9aa5b1', tag: 'bg-[#1c1f22] text-white',    label: 'Postes GIS',      glow: 'rgba(154,165,177,0.55)' },
  ELEC:  { dot: '#cbd5e1', tag: 'bg-[#475569] text-white',    label: 'Électricité',    glow: 'rgba(203,213,225,0.55)' },
  FIBER: { dot: '#10b981', tag: 'bg-[#047857] text-white',   label: 'Fibre Optique',  glow: 'rgba(16,185,129,0.55)' },
  HYD:   { dot: '#3b82f6', tag: 'bg-[#1e40af] text-white',   label: 'Hydraulique',    glow: 'rgba(59,130,246,0.55)' },
  EPC:   { dot: '#d4773b', tag: 'bg-[#d4773b] text-white',   label: 'EPC',            glow: 'rgba(212,119,59,0.55)' },
  GC:    { dot: '#94a3b8', tag: 'bg-[#334155] text-white',   label: 'Génie Civil',    glow: 'rgba(148,163,184,0.55)' },
  MNT:   { dot: '#cbd5e1', tag: 'bg-[#64748b] text-white',   label: 'Maintenance',    glow: 'rgba(203,213,225,0.55)' },
};

const ALGERIA_PATH = `M557.4,15.5 L557.6,14.4 L559.2,14.2 L560.1,13.0 L562.4,12.4 L565.4,11.9 L567.3,12.6 L568.1,14.1 L569.8,15.1 L575.7,14.3 L576.1,12.4 L577.6,12.3 L579.9,13.1 L582.3,13.5 L585.3,14.1 L590.1,13.7 L591.7,13.2 L592.8,12.6 L596.6,11.4 L598.7,10.4 L600.3,9.1 L603.0,8.5 L606.4,7.9 L608.2,7.3 L609.5,7.9 L612.0,8.3 L615.1,8.4 L617.7,8.7 L620.6,8.3 L622.8,8.5 L624.6,8.4 L627.1,8.1 L628.7,8.5 L632.8,8.7 L634.5,7.9 L637.2,8.5 L640.9,9.1 L646.1,9.1 L649.3,8.8 L651.8,9.0 L652.8,9.6 L655.9,10.3 L658.1,10.6 L659.5,11.7 L662.2,12.5 L666.3,13.8 L666.3,14.7 L665.6,15.9 L668.7,18.3 L675.7,20.0 L682.1,19.2 L682.8,18.8 L684.4,18.7 L686.1,18.1 L687.3,17.4 L688.4,16.7 L688.6,15.4 L690.0,14.2 L692.0,13.7 L693.9,12.9 L695.3,12.2 L696.3,11.8 L697.5,11.8 L699.0,11.5 L700.4,12.5 L704.8,11.9 L705.5,11.9 L709.7,11.1 L714.6,9.6 L718.8,8.4 L722.0,7.3 L723.0,6.1 L722.1,5.1 L722.3,4.0 L723.0,2.8 L725.9,1.5 L727.9,0.5 L731.0,0.3 L733.2,0.1 L735.1,0.7 L735.5,1.5 L736.6,1.8 L737.1,2.8 L737.6,3.5 L738.2,3.6 L737.8,4.6 L740.7,5.2 L741.5,5.7 L742.5,6.1 L743.5,6.2 L745.0,6.3 L746.4,5.7 L747.4,6.3 L748.6,5.9 L750.5,6.0 L751.2,6.3 L752.9,7.0 L753.0,7.9 L754.1,8.8 L755.8,9.1 L761.3,7.7 L763.6,7.4 L765.5,7.8 L766.8,7.3 L769.8,5.3 L770.9,3.6 L770.7,2.7 L768.2,1.2 L767.5,0.2 L769.9,0.1 L771.8,1.0 L772.8,0.3 L774.7,1.0 L776.6,0.6 L777.7,0.6 L777.9,1.8 L781.2,1.9 L784.0,3.0 L787.2,4.9 L788.8,5.6 L790.3,4.9 L791.2,5.4 L792.3,5.6 L793.7,5.9 L797.0,5.3 L795.8,6.5 L795.7,7.5 L795.9,8.4 L795.5,9.1 L797.4,10.5 L802.5,11.0 L809.7,9.3 L816.0,7.0 L818.0,6.1 L819.6,7.0 L821.2,7.7 L822.9,7.4 L826.5,7.7 L828.9,8.4 L830.9,8.1 L832.4,7.7 L835.5,7.0 L836.9,6.8 L838.4,7.0 L838.0,7.9 L837.7,9.4 L837.7,10.2 L839.7,10.8 L839.7,11.8 L837.1,13.0 L835.6,13.1 L834.0,13.7 L832.6,13.6 L830.0,14.0 L828.1,15.0 L829.8,15.3 L830.1,16.5 L830.5,17.8 L829.3,19.0 L827.9,20.8 L826.4,21.1 L825.8,21.9 L824.3,22.3 L822.7,23.0 L821.9,23.8 L819.5,24.4 L817.9,25.1 L816.4,25.6 L815.2,25.9 L814.7,26.4 L815.5,27.8 L817.2,28.3 L821.1,28.5 L822.3,29.0 L822.8,29.0 L824.8,28.8 L826.7,29.4 L826.2,30.6 L826.1,31.9 L825.2,33.9 L825.6,34.7 L824.2,35.4 L823.9,36.5 L823.8,38.3 L822.8,39.9 L822.3,41.1 L823.4,42.0 L823.7,43.6 L822.1,45.4 L821.6,47.5 L820.5,50.3 L819.9,50.7 L819.5,51.9 L819.7,52.8 L820.3,56.2 L820.0,57.7 L820.0,59.6 L822.0,61.6 L823.4,62.0 L824.4,63.4 L824.2,65.5 L824.7,68.5 L825.8,71.3 L824.1,71.8 L823.1,73.4 L823.1,74.3 L822.4,76.3 L822.2,78.3 L823.3,79.8 L825.9,80.6 L827.6,81.3 L830.1,81.5 L827.6,84.2 L824.6,87.6 L823.5,89.6 L822.4,94.4 L821.0,94.6 L819.3,96.0 L819.7,97.4 L820.4,99.0 L820.7,100.5 L820.8,102.2 L822.5,104.0 L821.3,104.3 L818.6,106.5 L820.6,107.2 L820.0,108.0 L818.9,108.9 L818.1,109.4 L817.8,110.8 L815.3,111.4 L814.5,112.3 L813.0,113.2 L811.1,113.6 L810.3,114.5 L806.4,116.3 L804.6,116.9 L803.8,117.7 L801.7,118.0 L800.1,118.9 L800.0,120.1 L794.4,128.9 L787.7,131.5 L786.7,132.0 L786.7,132.5 L784.4,133.2 L785.9,135.3 L785.0,141.6 L786.2,145.7 L787.7,151.6 L795.1,161.5 L802.4,172.3 L809.9,175.0 L812.6,178.2 L819.0,183.8 L845.8,214.2 L860.2,224.6 L872.9,268.7 L878.0,304.1 L874.8,305.0 L875.5,311.0 L897.6,355.8 L902.0,406.1 L901.1,408.0 L901.1,412.9 L898.4,418.4 L895.1,419.8 L898.0,420.4 L897.2,423.0 L894.8,424.8 L894.7,426.6 L893.5,428.9 L893.5,431.7 L894.1,437.5 L895.3,439.6 L895.7,442.0 L896.6,445.7 L897.6,448.3 L899.2,450.5 L899.7,460.8 L877.9,476.6 L881.5,489.3 L905.5,533.3 L906.8,536.2 L908.7,539.1 L912.2,544.8 L913.4,546.7 L914.3,548.9 L916.7,550.0 L918.1,551.2 L921.1,553.9 L926.0,554.1 L930.2,554.1 L932.3,553.3 L933.9,552.4 L936.2,552.4 L939.1,552.7 L940.6,554.5 L942.2,553.6 L944.9,552.5 L950.0,554.3 L954.2,558.5 L956.9,559.6 L974.1,568.2 L978.7,566.7 L982.0,566.8 L999.5,598.4 L973.1,612.2 L924.3,638.3 L903.3,649.5 L864.5,670.4 L798.9,706.5 L771.8,722.8 L758.3,733.1 L741.5,746.6 L711.7,770.5 L624.1,792.4 L580.9,799.9 L578.4,798.1 L574.3,795.3 L570.9,793.0 L570.4,791.7 L570.3,790.4 L572.9,788.0 L574.6,785.8 L575.2,783.4 L578.0,781.1 L577.8,779.0 L577.1,775.6 L575.2,772.7 L576.3,769.9 L575.3,768.2 L575.9,763.7 L574.5,761.6 L568.4,758.6 L565.1,756.9 L553.7,754.7 L544.6,753.9 L541.5,753.0 L538.7,751.4 L535.9,750.9 L532.0,744.9 L526.8,741.5 L524.0,742.2 L521.2,744.7 L519.0,743.0 L515.8,742.7 L513.4,743.4 L512.1,743.1 L510.1,740.9 L506.6,740.7 L502.9,737.5 L499.2,728.8 L493.6,726.6 L485.2,724.1 L483.6,721.5 L481.0,721.4 L476.8,721.7 L475.9,719.1 L477.5,709.8 L476.3,704.7 L419.8,673.0 L414.9,667.2 L410.0,664.3 L404.1,660.8 L400.4,658.6 L382.0,647.7 L370.9,641.0 L356.3,632.2 L339.0,621.9 L321.7,611.7 L312.9,606.5 L293.8,595.4 L288.5,592.4 L276.9,585.7 L273.3,583.7 L259.9,576.0 L246.5,568.2 L238.7,563.9 L231.3,559.7 L189.3,535.5 L177.8,528.7 L161.6,519.3 L151.8,513.8 L136.2,505.0 L126.0,499.2 L123.4,497.9 L112.5,491.7 L109.3,489.9 L99.0,484.3 L85.5,476.8 L81.0,474.3 L45.2,455.4 L0.1,425.5 L0.4,414.2 L4.5,368.1 L13.1,363.8 L20.4,358.7 L25.3,356.2 L29.5,353.9 L34.4,351.4 L35.9,349.7 L38.2,348.7 L43.0,345.7 L48.0,343.8 L50.3,342.9 L50.8,341.7 L51.4,340.6 L55.1,340.8 L62.2,340.2 L63.9,339.6 L70.4,335.2 L75.5,333.9 L79.0,335.0 L80.9,334.8 L82.8,335.2 L86.4,335.6 L88.5,336.1 L92.5,336.5 L95.9,334.2 L98.9,334.0 L101.6,333.9 L103.9,334.0 L106.8,332.3 L110.2,332.3 L111.4,331.9 L114.8,332.0 L117.5,332.0 L119.1,331.6 L122.8,331.5 L126.1,332.2 L128.0,331.6 L129.6,331.5 L135.8,330.3 L139.8,330.1 L142.9,331.1 L141.9,332.8 L141.9,334.2 L144.3,333.3 L145.5,333.9 L147.9,335.2 L149.9,335.4 L150.9,335.9 L151.0,334.4 L156.3,329.0 L161.9,320.4 L164.6,317.0 L170.8,313.1 L180.9,306.6 L226.5,286.7 L243.5,282.0 L244.4,280.6 L244.6,280.1 L243.2,278.7 L242.5,277.7 L243.3,275.2 L244.4,274.5 L245.0,274.1 L245.9,273.4 L246.7,272.2 L247.6,271.8 L247.7,271.1 L248.5,270.4 L248.5,269.5 L248.7,268.2 L248.1,267.2 L248.0,266.6 L247.6,266.5 L246.9,266.8 L246.0,266.1 L245.3,264.5 L244.9,263.7 L243.8,263.7 L243.7,262.0 L243.2,262.7 L243.6,264.6 L242.6,264.6 L242.2,265.0 L242.0,263.8 L242.2,262.1 L240.8,261.0 L240.4,261.9 L239.2,262.3 L239.3,263.5 L238.3,263.2 L237.0,263.3 L237.2,261.9 L237.6,260.6 L237.2,258.9 L236.8,257.7 L238.1,256.6 L237.2,255.9 L237.8,255.0 L238.1,253.8 L238.9,253.0 L240.1,253.3 L240.8,252.6 L242.0,252.2 L243.2,251.6 L242.6,240.7 L275.0,234.9 L282.8,232.9 L281.8,231.8 L281.9,230.5 L280.6,228.2 L280.0,226.5 L278.3,224.0 L277.9,221.3 L278.5,219.9 L279.5,219.5 L284.4,219.6 L289.3,219.5 L296.0,218.5 L300.6,217.5 L308.7,217.6 L310.5,217.4 L314.8,218.3 L322.4,216.5 L324.6,217.6 L327.0,217.4 L329.1,218.1 L333.2,218.5 L336.8,219.5 L343.5,220.5 L349.6,220.5 L354.4,220.6 L358.4,220.8 L361.7,220.7 L363.3,219.7 L363.8,218.9 L362.2,217.1 L359.3,217.3 L357.4,217.5 L357.9,216.6 L359.7,214.7 L359.7,212.5 L359.4,210.3 L360.7,209.3 L361.6,206.9 L365.5,206.3 L366.4,205.5 L368.6,204.1 L370.4,202.7 L358.4,193.9 L347.2,181.8 L348.4,179.8 L349.1,178.6 L348.0,176.9 L346.6,176.3 L345.4,175.3 L342.9,172.3 L341.6,170.9 L339.6,169.1 L339.4,166.6 L339.3,164.8 L340.8,161.4 L341.2,159.9 L342.1,158.2 L342.5,156.6 L342.6,155.5 L342.4,154.2 L341.2,152.9 L340.1,150.5 L337.2,150.5 L339.0,146.3 L340.1,132.0 L337.2,124.2 L336.0,121.1 L337.1,114.2 L335.1,113.4 L333.9,112.0 L332.8,110.4 L331.2,109.2 L331.1,108.5 L333.9,105.6 L335.7,103.4 L332.5,101.7 L330.0,100.9 L328.3,99.3 L325.5,97.9 L324.5,96.3 L322.4,95.2 L318.5,93.9 L316.9,92.3 L315.4,91.9 L314.0,90.8 L313.3,88.5 L314.6,88.1 L316.5,88.2 L319.5,89.0 L321.8,88.8 L323.4,88.9 L326.5,88.5 L328.6,88.1 L329.5,87.7 L332.0,86.6 L332.8,86.8 L334.0,86.9 L336.0,85.4 L337.3,84.3 L339.5,84.3 L340.6,83.1 L341.9,82.2 L343.2,81.7 L344.3,80.7 L346.9,79.7 L348.7,79.0 L350.9,78.8 L353.0,78.6 L353.7,77.9 L355.5,76.8 L358.2,75.9 L359.2,74.1 L361.1,69.4 L362.1,67.5 L362.3,66.7 L363.8,66.9 L365.3,65.5 L368.1,64.3 L368.7,63.3 L369.9,62.5 L372.2,61.9 L373.6,60.5 L375.5,60.4 L376.5,61.0 L379.2,59.5 L381.1,58.1 L383.0,59.3 L385.8,60.2 L388.2,60.8 L390.2,60.4 L393.1,58.0 L394.8,57.9 L396.3,55.3 L396.9,53.1 L399.4,53.3 L400.8,52.7 L402.4,52.1 L403.4,52.5 L405.5,53.5 L405.0,54.3 L405.8,55.6 L408.1,56.5 L412.2,57.3 L417.3,56.3 L421.2,54.2 L422.5,51.9 L423.9,50.5 L424.4,49.3 L425.9,47.3 L428.3,44.8 L430.4,43.1 L432.7,42.4 L434.5,41.5 L435.8,40.9 L438.4,38.8 L441.7,38.3 L443.7,37.2 L448.5,35.5 L451.1,33.9 L456.3,33.3 L458.4,32.3 L460.5,32.0 L464.4,29.8 L465.4,28.2 L468.9,27.5 L472.3,26.3 L473.7,26.4 L477.8,25.5 L481.1,25.7 L484.2,24.5 L485.4,23.7 L487.0,23.9 L488.1,24.3 L489.5,24.4 L491.9,24.8 L493.9,24.3 L496.4,24.4 L498.5,24.1 L500.8,23.7 L504.9,23.3 L508.8,23.0 L511.9,22.7 L516.6,23.1 L521.1,22.5 L523.7,21.9 L525.0,21.6 L527.6,21.0 L529.3,20.3 L531.4,20.1 L533.5,19.6 L536.4,20.7 L537.5,21.8 L540.6,22.0 L545.5,21.5 L548.9,20.2 L551.8,18.7 L554.2,18.0 L556.3,16.7 L557.4,15.5 Z`;

const MIN_LON = -8.674, MAX_LON = 11.987;
const MIN_LAT = 18.960, MAX_LAT = 37.089;
const VIEW_W = 1000, VIEW_H = 800;

function projectSVG(lon: number, lat: number) {
  return {
    x: ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * VIEW_W,
    y: (1 - (lat - MIN_LAT) / (MAX_LAT - MIN_LAT)) * VIEW_H,
  };
}

const hotspots: ProjectHotspot[] = [
  { id: "p1",  num: "01", year: "2020", sector: "THT",  name: "Poste 400/220 kV Larbaa",            nameEn: "400/220 kV Substation Larbaa",           client: "SONELGAZ STOS",       location: "W. Blida",         scope: "Poste electrique THT complet, massifs beton et raccordement reseau national.",       scopeEn: "Complete HV substation, concrete foundations and national grid connection.",        image: "/images/project-galleries/p1/image-01.png", leftPct: 57.7, topPct: 3.7 },
  { id: "p2",  num: "02", year: "2022", sector: "GIS",  name: "Poste GIS 60/30 kV Eucalyptus",     nameEn: "GIS Substation 60/30 kV Eucalyptus",     client: "SONELGAZ ENGINEERING", location: "W. Alger",         scope: "Montage GIS Siemens SF6, caniveaux techniques, essais dielectriques.",             scopeEn: "Siemens SF6 GIS assembly, technical ducts and dielectric testing.",              image: "/images/project-galleries/p2/image-01.png", leftPct: 57.0, topPct: 1.9 },
  { id: "p3",  num: "03", year: "2023", sector: "GIS",  name: "Poste GIS 60/10 kV Bouzereah",     nameEn: "GIS Substation 60/10 kV Bouzereah",     client: "SONELGAZ ENGINEERING", location: "W. Alger",         scope: "Montage sous enveloppe mettallique, controle-commande.",                           scopeEn: "Metal-enclosed switchgear assembly and SCADA.",                                   image: "/images/project-placeholder.svg", leftPct: 56.3, topPct: 1.7 },
  { id: "p4",  num: "04", year: "2021", sector: "THT",  name: "Poste Injecteur 400/220 kV",       nameEn: "Injector Substation 400/220 kV",         client: "SONELGAZ STOS",       location: "W. Setif",        scope: "Evacuation centrale thermique, fondations transformateurs, montage THT.",             scopeEn: "Power plant evacuation, transformer foundations and HV assembly.",               image: "/images/project-galleries/p4/image-01.png", leftPct: 68.2, topPct: 5.0 },
  { id: "p5",  num: "05", year: "2022", sector: "THT",  name: "Poste PACK+ 60/30 kV",             nameEn: "PACK+ Substation 60/30 kV",             client: "SONELGAZ STOS",       location: "W. Djelfa",       scope: "Genie civil, montage electromecanique, essais.",                                     scopeEn: "Civil engineering, electromechanical assembly and testing.",                        image: "/images/project-placeholder.svg", leftPct: 57.8, topPct: 13.3 },
  { id: "p8",  num: "08", year: "2023", sector: "THT",  name: "Ligne aerienne 400 kV Marsat",     nameEn: "400 kV Overhead Line Marsat",           client: "SONELGAZ STOS",       location: "W. Mostaganem",   scope: "Construction ligne aerienne 400 kV, fondations, levage pylones, tirage cables.",   scopeEn: "400 kV overhead construction, foundations, pylon lifting and cable stringing.",   image: "/images/project-galleries/p6/image-01.png", leftPct: 42.7, topPct: 6.4 },
  { id: "p9",  num: "09", year: "2021", sector: "THT",  name: "Ligne 400 kV Hadjret Ennous",      nameEn: "400 kV Line Hadjret Ennous",            client: "SONELGAZ STOS",       location: "Tipaza",           scope: "Coupure de ligne 400 kV, pylones mettalliques, reglage cables.",                 scopeEn: "400 kV line section break, metallic pylons and cable tensioning.",               image: "/images/project-galleries/p6/image-02.png", leftPct: 53.8, topPct: 2.8 },
  { id: "p10", num: "10", year: "2023", sector: "ELEC", name: "Liaison souterraine 60 kV",           nameEn: "60 kV Underground Cable Link",           client: "SONELGAZ STOS",       location: "W. Alger",         scope: "Fouilles, terrassements, cablage et mise en service.",                             scopeEn: "Excavation, earthworks, cabling and commissioning.",                             image: "/images/project-galleries/p3/image-01.png", leftPct: 58.2, topPct: 2.0 },
  { id: "p11", num: "11", year: "2022", sector: "ELEC", name: "Ligne 220 kV Cap Blanc Oran",         nameEn: "220 kV Line Cap Blanc Oran",            client: "SONELGAZ STOS",     location: "W. Oran",          scope: "Aero-souterraine 220 kV pour station de dessalement.",                        scopeEn: "220 kV overhead-underground for desalination plant.",                             image: "/images/project-placeholder.svg", leftPct: 38.9, topPct: 7.7 },
  { id: "p14", num: "14", year: "2020", sector: "FIBER",name: "Fibre Optique 320 km Djanet",        nameEn: "320 km Fiber Optic Djanet",             client: "ALGERIE TELECOM",     location: "W. Djanet",        scope: "Fouilles mecanisees, pose fourreaux et tirage cables backbone.",            scopeEn: "Mechanized trenching, duct laying and backbone fiber cable pulling.",             image: "/images/project-placeholder.svg", leftPct: 87.9, topPct: 69.1 },
  { id: "p15", num: "15", year: "2020", sector: "FIBER",name: "Fibre Optique 160 km Illizi",          nameEn: "160 km Fiber Optic Illizi",             client: "ALGERIE TELECOM",     location: "W. Illizi",        scope: "Terrassement et pose de cable optique backbone.",                             scopeEn: "Earthworks and backbone fiber optic cable laying.",                              image: "/images/project-placeholder.svg", leftPct: 83.0, topPct: 58.4 },
  { id: "p18", num: "18", year: "2022", sector: "HYD",  name: "Conduites eau 28 km Ohanet",          nameEn: "28 km Water Pipelines Ohanet",          client: "SONATRACH DP/HMD",     location: "Ohanet",            scope: "Pose/depose conduites eau 4.5\" sur 28 km.",                                  scopeEn: "4.5\" water pipeline installation/removal over 28 km.",                           image: "/images/project-placeholder.svg", leftPct: 64.1, topPct: 46.3 },
  { id: "p19", num: "19", year: "2023", sector: "EPC",  name: "Usine Dolomite EPC",                  nameEn: "Dolomite Plant EPC",                     client: "ENCC-SPA",            location: "W. Oum El Bouaghi", scope: "Construction cle en main, charpente 1200T, silos, concasseurs.",            scopeEn: "Turnkey construction, 1200T steel structure, silos and crushers.",                    image: "/images/project-galleries/p7/image-01.png", leftPct: 76.4, topPct: 6.7 },
  { id: "p22", num: "22", year: "2023", sector: "GC",   name: "Workover Hassi Messaoud & Gassi",    nameEn: "Workover Hassi Messaoud & Gassi",       client: "SONATRACH DP/HMD",     location: "Hassi Messaoud",    scope: "Rehabilitation de plateformes de puits workover.",                             scopeEn: "Workover platform rehabilitation.",                                                image: "/images/project-galleries/p8/image-01.png", leftPct: 72.2, topPct: 29.8 },
  { id: "p33", num: "33", year: "2021", sector: "THT",  name: "Ligne 220 kV Phosphate 33 km",        nameEn: "220 kV Phosphate Line 33 km",           client: "SONELGAZ STOS",     location: "W. Tebessa",        scope: "Alimentation electrique complexe pour usine de phosphate.",                    scopeEn: "Complex power supply for phosphate processing plant.",                            image: "/images/project-galleries/p6/image-02.png", leftPct: 81.3, topPct: 9.3 },
  { id: "p6",  num: "06", year: "2022", sector: "EPC",  name: "Travaux centrale et traitement huile", nameEn: "Power Plant and Oil Treatment Works", client: "SONELGAZ ENGINEERING", location: "W. Djelfa", scope: "Travaux de construction et traitement d'huile industrielle.", scopeEn: "Construction and industrial oil treatment works.", image: "/images/project-placeholder.svg", leftPct: 61.0, topPct: 18.0 },
  { id: "p7",  num: "07", year: "2019", sector: "ELEC", name: "Tests CHELTERS MT/LV Adrar", nameEn: "Adrar MV/LV Shelter Testing", client: "SONATRACH", location: "W. Adrar", scope: "Tests et vérification des shelters électriques MT/LV.", scopeEn: "Testing and verification of MV/LV electrical shelters.", image: "/images/project-placeholder.svg", leftPct: 34.0, topPct: 45.0 },
  { id: "p12", num: "12", year: "2021", sector: "GC", name: "Génie civil 220 kV Skikda", nameEn: "220 kV Civil Engineering Skikda", client: "SONELGAZ STOS", location: "W. Skikda", scope: "Travaux de génie civil pour ouvrages électriques 220 kV.", scopeEn: "Civil works for 220 kV electrical infrastructure.", image: "/images/project-galleries/p4/image-03.png", leftPct: 79.0, topPct: 5.5 },
  { id: "p13", num: "13", year: "2023", sector: "THT", name: "Sous-station 60/30 kV RAR", nameEn: "RAR 60/30 kV Substation", client: "SONELGAZ ENGINEERING", location: "Oued Bellil, W. Ghardaia", scope: "Construction d'une sous-station 60/30 kV.", scopeEn: "Construction of a 60/30 kV substation.", image: "/images/project-galleries/p2/image-03.png", leftPct: 64.0, topPct: 31.0 },
  { id: "p16", num: "16", year: "2022", sector: "GC", name: "Maintenance génie civil", nameEn: "Civil Engineering Maintenance", client: "SONATRACH DP/RN", location: "Rhoud Enouss", scope: "Maintenance des ouvrages de génie civil industriels.", scopeEn: "Maintenance of industrial civil engineering structures.", image: "/images/project-galleries/p8/image-02.png", leftPct: 68.0, topPct: 37.0 },
  { id: "p17", num: "17", year: "2021", sector: "HYD", name: "Maintenance réseaux hydrauliques HMD", nameEn: "HMD Hydraulic Network Maintenance", client: "SONATRACH DP/HMD", location: "Hassi Messaoud", scope: "Maintenance des réseaux hydrauliques du site HMD.", scopeEn: "Maintenance of HMD site hydraulic networks.", image: "/images/project-galleries/p8/image-03.png", leftPct: 72.0, topPct: 32.0 },
  { id: "p20", num: "20", year: "2021", sector: "HYD", name: "Pose/dépose conduites eau", nameEn: "Water Pipeline Installation", client: "SONATRACH FOR HMD", location: "Gassi Touil", scope: "Pose et dépose de conduites d'eau industrielles.", scopeEn: "Installation and removal of industrial water pipelines.", image: "/images/project-galleries/p5/image-02.png", leftPct: 75.0, topPct: 39.0 },
  { id: "p21", num: "21", year: "2020", sector: "GC", name: "Réhabilitation réseaux sanitation", nameEn: "Sanitation Network Rehabilitation", client: "SONATRACH DP/TFT", location: "TFT", scope: "Réhabilitation des réseaux d'assainissement industriels.", scopeEn: "Rehabilitation of industrial sanitation networks.", image: "/images/project-galleries/p8/image-01.png", leftPct: 61.0, topPct: 57.0 },
  { id: "p23", num: "23", year: "2021", sector: "MNT", name: "Pompes submersibles Berkine", nameEn: "Berkine Submersible Pumps", client: "DIS LTD - WEATHERFORD and ENTP JV", location: "Groupement Berkine", scope: "Fourniture et maintenance de pompes submersibles.", scopeEn: "Supply and maintenance of submersible pumps.", image: "/images/project-galleries/p8/image-02.png", leftPct: 77.0, topPct: 31.0 },
  { id: "p24", num: "24", year: "2022", sector: "MNT", name: "Location groupes électrogènes", nameEn: "Generator and Cabin Rental", client: "BASP/HMD", location: "BRN", scope: "Location de groupes électrogènes et cabines.", scopeEn: "Rental of generator sets and cabins.", image: "/images/project-galleries/p8/image-03.png", leftPct: 74.0, topPct: 27.0 },
  { id: "p25", num: "25", year: "2019", sector: "MNT", name: "Location camions et transport", nameEn: "Truck and Personnel Transport Rental", client: "INERGA", location: "Blida", scope: "Location de camions et transport du personnel.", scopeEn: "Truck rental and personnel transportation.", image: "/images/project-galleries/p1/image-02.png", leftPct: 56.0, topPct: 4.5 },
  { id: "p26", num: "26", year: "2020", sector: "GC", name: "Fourniture magasins d'archives", nameEn: "Archive Store Supply", client: "GROUPEMENT QC", location: "Hassi Messaoud", scope: "Fourniture et aménagement de magasins d'archives.", scopeEn: "Supply and fit-out of archive storage facilities.", image: "/images/project-galleries/p8/image-01.png", leftPct: 71.0, topPct: 30.0 },
  { id: "p27", num: "27", year: "2023", sector: "HYD", name: "Installation systèmes irrigation", nameEn: "Irrigation System Installation", client: "DSA OUARGLA", location: "Ouargla", scope: "Installation de systèmes d'irrigation.", scopeEn: "Installation of irrigation systems.", image: "/images/project-galleries/p5/image-03.png", leftPct: 72.0, topPct: 39.0 },
  { id: "p28", num: "28", year: "2021", sector: "MNT", name: "Location bulldozers", nameEn: "Bulldozer Rental", client: "ENAGEO", location: "Hassi Messaoud", scope: "Location d'engins de terrassement lourds.", scopeEn: "Rental of heavy earthmoving equipment.", image: "/images/project-galleries/p8/image-02.png", leftPct: 73.0, topPct: 29.0 },
  { id: "p29", num: "29", year: "2020", sector: "HYD", name: "Forage puits eau 200 m", nameEn: "200 m Water Well Drilling", client: "DRE TIARET", location: "Sougueur, Tiaret", scope: "Forage et équipement d'un puits d'eau de 200 m.", scopeEn: "Drilling and equipping a 200 m water well.", image: "/images/project-galleries/p5/image-01.png", leftPct: 48.0, topPct: 18.0 },
  { id: "p30", num: "30", year: "2023", sector: "THT", name: "Poste PACK+ 60/30 kV El Bordjia", nameEn: "El Bordjia PACK+ 60/30 kV Substation", client: "SONELGAZ STOS", location: "El Bordjia, Mostaganem", scope: "Construction d'un poste PACK+ 60/30 kV.", scopeEn: "Construction of a PACK+ 60/30 kV substation.", image: "/images/project-galleries/p2/image-04.png", leftPct: 45.0, topPct: 8.0 },
  { id: "p31", num: "31", year: "2022", sector: "ELEC", name: "Forage horizontal 60 kV", nameEn: "60 kV Horizontal Drilling", client: "SONELGAZ STOS", location: "Skikda Ville", scope: "Forage horizontal pour liaison électrique 60 kV.", scopeEn: "Horizontal drilling for a 60 kV electrical link.", image: "/images/project-galleries/p3/image-02.png", leftPct: 80.0, topPct: 6.0 },
  { id: "p32", num: "32", year: "2023", sector: "ELEC", name: "Déroulage câbles 6,5 km AKB", nameEn: "6.5 km AKB Cable Stringing", client: "SONELGAZ STOS", location: "Akbou, W. Bejaia", scope: "Déroulage et raccordement de câbles sur 6,5 km.", scopeEn: "Stringing and connection of cables over 6.5 km.", image: "/images/project-galleries/p3/image-03.png", leftPct: 67.0, topPct: 8.0 },
  { id: "p34", num: "34", year: "2023", sector: "THT", name: "Levage pylônes 60 kV Zeralda", nameEn: "60 kV Zeralda Pylon Lifting", client: "SONELGAZ STOS", location: "Zeralda, W. Algiers", scope: "Levage et montage de pylônes pour ligne 60 kV.", scopeEn: "Lifting and assembly of pylons for a 60 kV line.", image: "/images/project-galleries/p6/image-01.png", leftPct: 55.0, topPct: 2.5 },
];

const OFFICIAL_PHOTO_PROJECTS = new Set(['p1', 'p2', 'p4', 'p8', 'p9', 'p10', 'p19', 'p22']);
const PROJECT_PLACEHOLDER = '/images/project-placeholder.svg';
const SECTOR_PLACEHOLDER_IMAGES: Record<string, string> = {
  THT: '/images/project-placeholders/gis-substation.png',
  GIS: '/images/project-placeholders/gis-substation.png',
  ELEC: '/images/project-placeholders/gis-substation.png',
  HYD: '/images/project-placeholders/hydraulics-water.png',
  FIBER: '/images/project-placeholders/civil-engineering.png',
  GC: '/images/project-placeholders/civil-engineering.png',
  EPC: '/images/project-placeholders/civil-engineering.png',
  MNT: '/images/project-placeholders/civil-engineering.png',
};

export default function InteractiveAlgeriaMap() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState<string>('p1');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [sectorFilter, setSectorFilter] = useState<string>('ALL');
  const [focusedProject, setFocusedProject] = useState<string | null>(null);
  const [mapDossierOpen, setMapDossierOpen] = useState(false);
  const [mapInView, setMapInView] = useState(false);
  const mapSectionRef = useRef<HTMLElement>(null);

  const visibleSectors = Array.from(new Set(hotspots.map((h) => h.sector)));
  const filteredHotspots = sectorFilter === 'ALL' ? hotspots : hotspots.filter((h) => h.sector === sectorFilter);

  const selected = filteredHotspots.find((h) => h.id === activeProject) || filteredHotspots[0] || hotspots[0];
  const selectedIdx = filteredHotspots.findIndex((h) => h.id === activeProject);
  const sc = sectorColors[selected.sector] || sectorColors.THT;
  const selectedPlaceholder = SECTOR_PLACEHOLDER_IMAGES[selected.sector] || PROJECT_PLACEHOLDER;

  const toSVG = (pct: number, axis: 'x' | 'y') =>
    axis === 'x' ? (pct / 100) * VIEW_W : (pct / 100) * VIEW_H;

  const zoomIn  = () => setZoom((z) => Math.min(z + 0.5, 5));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.5, 0.5));
  const focusProject = (id: string) => {
    setActiveProject(id);
    setFocusedProject(id);
    setZoom(1.8);
    setPan({ x: 0, y: 0 });
  };
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); setFocusedProject(null); };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    setZoom((z) => Math.max(0.5, Math.min(5, z + (e.deltaY > 0 ? -0.15 : 0.15))));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  const touchStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, panX: pan.x, panY: pan.y };
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && touchStart.current) {
      setPan({
        x: touchStart.current.panX + (e.touches[0].clientX - touchStart.current.x),
        y: touchStart.current.panY + (e.touches[0].clientY - touchStart.current.y),
      });
    }
  };
  const handleTouchEnd = () => { touchStart.current = null; };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mapDossierOpen) {
        setMapDossierOpen(false);
        return;
      }
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(z + 0.5, 5));
      if (e.key === '-') setZoom((z) => Math.max(z - 0.5, 0.5));
      if (e.key === '0') resetView();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
        focusProject(filteredHotspots[Math.min(selectedIdx + 1, filteredHotspots.length - 1)].id);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
        focusProject(filteredHotspots[Math.max(selectedIdx - 1, 0)].id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIdx, mapDossierOpen]);

  useEffect(() => {
    if (!mapDossierOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const previous = { htmlOverflow: html.style.overflow, bodyOverflow: body.style.overflow };
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
    };
  }, [mapDossierOpen]);

  useEffect(() => {
    const section = mapSectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setMapInView(entry.isIntersecting), { rootMargin: '160px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const focusOffsetX = focusedProject ? 50 - selected.leftPct : 0;
  const focusOffsetY = focusedProject ? 50 - selected.topPct : 0;
  const mapTransform = focusedProject
    ? `translate(calc(${focusOffsetX}% + ${pan.x}px), calc(${focusOffsetY}% + ${pan.y}px)) scale(${zoom})`
    : `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;

  return (
    <section ref={mapSectionRef} id="map" className="bg-[var(--color-midnight)] text-white relative overflow-hidden">
      {/* Premium atmospheric layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Big warm glow - top right */}
        <div className="absolute -top-1/2 -right-1/3 w-[80vw] h-[80vw] rounded-full bg-[#d4773b] opacity-[0.04] blur-[120px]" />
        {/* Cool glow - bottom left */}
        <div className="absolute -bottom-1/2 -left-1/3 w-[80vw] h-[80vw] rounded-full bg-[#1e293b] opacity-[0.4] blur-[120px]" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#08090b] to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08090b] to-transparent" />
      </div>

      <div className="container-editorial relative z-10 pt-20 sm:pt-24 lg:pt-32 pb-20 sm:pb-24 lg:pb-32">

        {/* Editorial header — 12-col grid like a magazine spread */}
        <ScrollReveal>
          <div className="grid grid-cols-12 gap-x-6 gap-y-8 mb-12 lg:mb-16">
            <div className="col-span-12 lg:col-span-2 flex lg:flex-col items-start gap-3 lg:gap-4">
              <span className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">05</span>
              <span className="block w-8 h-px bg-white/15 lg:w-px lg:h-8" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">
                {language === 'ar' ? 'الوجود' : language === 'en' ? 'Reach' : 'Presence'}
              </span>
            </div>
            <div className="col-span-12 lg:col-span-7 space-y-5">
              <h2 className="display-xl text-white leading-[0.95] tracking-[-0.03em]">
                {language === 'fr' ? (
                  <>Du Sud au Nord.<br/><span className="text-white/35">Tout le territoire.</span></>
                ) : language === 'en' ? (
                  <>North to deep South.<br/><span className="text-white/35">All of Algeria.</span></>
                ) : (
                  <>من الشمال إلى الجنوب.<br/><span className="text-white/35">كل التراب.</span></>
                )}
              </h2>
              <p className="text-sm sm:text-base text-white/45 leading-[1.7] max-w-xl font-light">
                {language === 'fr'
                  ? '34 projets sur 18 wilayas, du poste THT d\'Alger au backbone fibre d\'Illizi. Chaque point est une commande livrée, un engagement tenu.'
                  : language === 'en'
                  ? '34 projects across 18 wilayas — from Algiers HV substations to the Illizi fiber backbone. Every marker is a delivered contract.'
                  : '34 مشروع في 18 ولاية.'}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:col-start-10 flex flex-col justify-end items-start lg:items-end gap-2">
              <div className="text-right">
                <div className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mb-1">
                  {language === 'fr' ? 'Total' : 'Total'}
                </div>
                <div className="flex items-baseline gap-2 lg:flex-col lg:items-end lg:gap-0">
                  <span className="text-5xl lg:text-6xl font-display font-light tracking-[-0.04em] text-white">34</span>
                  <span className="text-xs text-white/40 tracking-widest uppercase lg:mt-1">
                    {language === 'fr' ? 'Projets' : 'Projects'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Sector filter — compact pill nav */}
        <ScrollReveal delay={0.05}>
          <div className="relative w-full pb-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#08090b] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#08090b] to-transparent" />
            <div className="w-full overflow-x-auto scrollbar-hide">
            <div
              className="items-center gap-1 sm:gap-2 mb-8 whitespace-nowrap"
              style={{ display: 'flex', flexWrap: 'nowrap', width: 'max-content', minWidth: '100%' }}
            >
            <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.12em] sm:tracking-[0.2em] text-white/30 uppercase mr-1 whitespace-nowrap" style={{ flexShrink: 0 }}>
              {language === 'fr' ? 'Filtrer' : language === 'en' ? 'Filter' : 'تصفية'}:
            </span>
            {['ALL', ...visibleSectors].map((sector) => {
              const sc = sectorColors[sector] || sectorColors.THT;
              const isActive = sectorFilter === sector;
              return (
                <button
                  key={sector}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setSectorFilter(sector);
                    if (sector !== 'ALL') {
                      const first = hotspots.find((h) => h.sector === sector);
                      if (first) focusProject(first.id);
                    }
                  }}
                  className={`flex whitespace-nowrap items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-full text-[9px] sm:text-[10px] font-bold tracking-[0.02em] sm:tracking-wider transition-all duration-300 active:scale-95 ${
                    isActive
                      ? 'bg-white text-[#08090b] ring-2 ring-[var(--color-accent)]/40 ring-offset-1 ring-offset-[#08090b]'
                      : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                  }`}
                  style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
                >
                  {sector !== 'ALL' && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: sc.dot }}
                    />
                  )}
                  <span>
                    {sector === 'ALL'
                      ? (language === 'fr' ? 'Tous' : language === 'en' ? 'All' : 'الكل')
                      : (sectorColors[sector]?.label || sector)}
                  </span>
                  {isActive && (
                    <span className="text-[9px] font-mono opacity-60">
                      ({sector === 'ALL' ? hotspots.length : hotspots.filter((h) => h.sector === sector).length})
                    </span>
                  )}
                </button>
              );
            })}
            </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Map — main feature */}
        <ScrollReveal className="lg:col-span-8">
          <div className="relative">
            {/* Frame numbers — editorial detail */}
            <div className="absolute -top-6 left-0 flex items-center gap-2 text-[9px] font-mono tracking-[0.2em] text-white/25 uppercase z-10">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#d4773b] animate-pulse" />
              <span>{language === 'fr' ? 'Carte operationnelle' : 'Operational map'}</span>
            </div>
            <div className="absolute -top-6 right-0 text-[9px] font-mono tracking-[0.2em] text-white/25 uppercase z-10">
              {language === 'fr' ? 'DZA · GADM v4.1' : 'DZA · GADM v4.1'}
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-[#03050a]" style={{
              boxShadow: '0 80px 120px -40px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.03)'
            }}>

              {/* Map controls — top right (refined, smaller) */}
              <div className="absolute top-5 right-5 z-20 flex items-center gap-px p-1 rounded-xl bg-black/60 backdrop-blur-xl border border-white/[0.08]">
                <button type="button" onClick={zoomIn} aria-label="Zoom in"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <div className="w-px h-4 bg-white/[0.08]" />
                <button type="button" onClick={zoomOut} aria-label="Zoom out"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors">
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <div className="w-px h-4 bg-white/[0.08]" />
                <button type="button" onClick={resetView} aria-label="Reset"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors">
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>

              {/* Counter — top left */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-3">
                <div className="flex items-center gap-px p-1 rounded-xl bg-black/60 backdrop-blur-xl border border-white/[0.08]">
                  <button type="button"
                    onClick={() => focusProject(filteredHotspots[Math.max(selectedIdx - 1, 0)].id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <div className="w-px h-4 bg-white/[0.08]" />
                  <button type="button"
                    onClick={() => focusProject(filteredHotspots[Math.min(selectedIdx + 1, filteredHotspots.length - 1)].id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] font-mono text-white/40 tracking-widest px-2">
                  {String(selectedIdx + 1).padStart(2, '0')} / {String(filteredHotspots.length).padStart(2, '0')}
                </span>
              </div>

              {/* Map viewport */}
              <div
                className="relative select-none overflow-hidden"
                style={{
                  aspectRatio: '16/10',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  touchAction: 'pan-y',
                }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center origin-center"
                  style={{ transform: mapTransform, transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
                >
                  <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full h-full">
                    <defs>
                      <radialGradient id="algeriaGradient" cx="50%" cy="35%" r="70%">
                        <stop offset="0%" stopColor="#1a2e44" stopOpacity="0.85" />
                        <stop offset="60%" stopColor="#0d1a2a" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#050a14" stopOpacity="0.4" />
                      </radialGradient>
                      <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="4" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                      <filter id="bigGlow" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="8" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>

                    {/* Background ocean */}
                    <rect width={VIEW_W} height={VIEW_H} fill="#020610" />

                    {/* Subtle grid */}
                    <g stroke="rgba(212,119,59,0.025)" strokeWidth="0.5" vectorEffect="non-scaling-stroke">
                      {[250, 500, 750].map(x => <line key={`vg${x}`} x1={x} y1="0" x2={x} y2={VIEW_H} />)}
                      {[200, 400, 600].map(y => <line key={`hg${y}`} x1="0" y1={y} x2={VIEW_W} y2={y} />)}
                    </g>

                    {/* Country */}
                    <path d={ALGERIA_PATH} fill="url(#algeriaGradient)" />
                    <path d={ALGERIA_PATH} fill="none" stroke="rgba(212,119,59,0.15)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <path d={ALGERIA_PATH} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />

                    {/* Hotspots */}
                    {filteredHotspots.map((h) => {
                      const hsc = sectorColors[h.sector] || sectorColors.THT;
                      const isActive = activeProject === h.id;
                      const isHovered = hoveredProject === h.id;
                      const px = toSVG(h.leftPct, 'x');
                      const py = toSVG(h.topPct, 'y');
                      const r = isActive ? 6 : isHovered ? 5 : 3.5;

                      return (
                        <g key={h.id} style={{ cursor: 'pointer', opacity: focusedProject && focusedProject !== h.id ? 0.28 : 1, transition: 'opacity 0.3s ease' }}
                           onClick={() => focusProject(h.id)}
                           onMouseEnter={() => setHoveredProject(h.id)}
                           onMouseLeave={() => setHoveredProject(null)}>
                          {isActive && (
                            <>
                              <circle cx={px} cy={py} r="14" fill="none" stroke={hsc.dot} strokeWidth="0.8" strokeOpacity="0.4">
                                {mapInView && !shouldReduceMotion && <animate attributeName="r" values="8;22;8" dur="2.8s" repeatCount="indefinite" />}
                                {mapInView && !shouldReduceMotion && <animate attributeName="stroke-opacity" values="0.5;0.05;0.5" dur="2.8s" repeatCount="indefinite" />}
                              </circle>
                              <circle cx={px} cy={py} r="6" fill={hsc.dot} filter="url(#bigGlow)" fillOpacity="0.4" />
                            </>
                          )}
                          {!isActive && isHovered && (
                            <circle cx={px} cy={py} r="10" fill="none" stroke={hsc.dot} strokeWidth="0.6" strokeOpacity="0.4" />
                          )}
                          <circle cx={px} cy={py} r={r} fill={hsc.dot} fillOpacity={isActive ? 1 : 0.65} />
                          <circle cx={px} cy={py} r={r - 1.5} fill="white" fillOpacity="0.95" />
                          <text x={px} y={py + 0.8} fontSize="2.4" fontFamily="monospace" fontWeight="700"
                            fill={hsc.dot} textAnchor="middle" dominantBaseline="middle"
                            vectorEffect="non-scaling-stroke" style={{ pointerEvents: 'none' }}>
                            {h.num}
                          </text>
                        </g>
                      );
                    })}

                    {/* TAMMA HQ — Algiers */}
                    {(() => {
                      const hq = projectSVG(3.042, 36.753);
                      return (
                        <g>
                          <circle cx={hq.x} cy={hq.y} r="10" fill="none" stroke="#d4773b" strokeWidth="0.6" strokeOpacity="0.5">
                            {mapInView && !shouldReduceMotion && <animate attributeName="r" values="6;14;6" dur="3s" repeatCount="indefinite" />}
                            {mapInView && !shouldReduceMotion && <animate attributeName="stroke-opacity" values="0.5;0.1;0.5" dur="3s" repeatCount="indefinite" />}
                          </circle>
                          <rect x={hq.x - 2.5} y={hq.y - 2.5} width="5" height="5" fill="#d4773b" transform={`rotate(45 ${hq.x} ${hq.y})`} />
                          <rect x={hq.x - 1.2} y={hq.y - 1.2} width="2.4" height="2.4" fill="white" transform={`rotate(45 ${hq.x} ${hq.y})`} />
                        </g>
                      );
                    })()}

                    {/* Compass rose — bottom right */}
                    <g transform={`translate(${VIEW_W - 60}, ${VIEW_H - 60})`} opacity="0.3">
                      <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
                      <line x1="0" y1="-18" x2="0" y2="18" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
                      <line x1="-18" y1="0" x2="18" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
                      <polygon points="0,-20 -3,-12 0,-15 3,-12" fill="#d4773b" />
                      <text x="0" y="-25" fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle" fontFamily="monospace" letterSpacing="2">N</text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Bottom bar — refined */}
              <div className="px-5 py-3.5 flex items-center justify-between gap-4 border-t border-white/[0.04] bg-gradient-to-r from-transparent via-white/[0.01] to-transparent">
                <span className="text-[9px] font-mono text-white/20 tracking-widest uppercase shrink-0">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Project dossier — large, editorial layout */}
        <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start mobile-map-drawer">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 lg:mt-0 grid grid-cols-12 gap-6 lg:block"
            >
              {/* Image — 7 cols on lg, full on mobile */}
              <div className="col-span-12 lg:col-span-12">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-[#040c14] border border-white/[0.04]">
                  <Image
                    src={OFFICIAL_PHOTO_PROJECTS.has(selected.id) ? selected.image : selectedPlaceholder}
                    alt={OFFICIAL_PHOTO_PROJECTS.has(selected.id) ? selected.name : `${selected.name} — official photo pending`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                    <span className="text-[9px] font-mono tracking-[0.2em] text-white/60 uppercase">
                      {language === 'fr' ? 'Projet' : 'Project'} {selected.num} / 34
                    </span>
                    <span className={`text-[9px] font-bold tracking-[0.2em] text-white px-3 py-1.5 uppercase rounded-full backdrop-blur-md ${sc.tag}`}>
                      {sc.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Text — 5 cols on lg, full on mobile */}
              <div className="col-span-12 lg:col-span-12 flex flex-col justify-between space-y-6 lg:space-y-5">

                <div className="space-y-5">
                  <div className="flex items-center gap-3 pb-4 border-b border-white/[0.06]">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">Client</span>
                    <span className="text-sm font-semibold text-white tracking-tight">{selected.client}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-display font-medium text-white leading-[1.1] tracking-[-0.02em]">
                    {language === 'en' ? selected.nameEn : selected.name}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-widest uppercase">
                    <span className="block w-3 h-px bg-[#d4773b]" />
                    <span>{selected.location}</span>
                    <span className="block w-3 h-px bg-[#d4773b]" />
                    <span>{selected.year}</span>
                  </div>

                  <p className="text-sm lg:text-base text-white/55 leading-[1.75] font-light">
                    {language === 'en' ? selected.scopeEn : selected.scope}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono tracking-[0.2em] text-white/30 uppercase mb-1">
                      {language === 'fr' ? 'Suivant' : 'Next'}
                    </span>
                    <span className="text-sm text-white/70 truncate max-w-[180px]">
                      {language === 'en' ? filteredHotspots[(selectedIdx + 1) % filteredHotspots.length].nameEn : filteredHotspots[(selectedIdx + 1) % filteredHotspots.length].name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (OFFICIAL_PHOTO_PROJECTS.has(selected.id)) {
                        window.dispatchEvent(new CustomEvent('tamma:open-project', { detail: { id: selected.id } }));
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      } else {
                        setMapDossierOpen(true);
                      }
                    }}
                    className="group flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#08090b] text-xs font-semibold tracking-wider uppercase hover:bg-[#d4773b] hover:text-white transition-all">
                    <span>{language === 'fr' ? 'Voir le dossier' : language === 'en' ? 'View dossier' : 'عرض الملف'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>
        </div>

      </div>

      <AnimatePresence>
        {mapDossierOpen && !OFFICIAL_PHOTO_PROJECTS.has(selected.id) && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="map-dossier-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMapDossierOpen(false)}
          >
            <motion.article
              className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white text-[var(--color-ink)] shadow-2xl"
              initial={{ y: 24, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 12, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[rgba(10,12,13,0.06)] bg-white/95 px-6 py-4 backdrop-blur-md sm:px-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[var(--color-accent)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                    {sectorColors[selected.sector]?.label || selected.sector}
                  </span>
                  <span className="text-sm font-medium text-[var(--color-mist)]">
                    {language === 'fr' ? 'Projet' : language === 'en' ? 'Project' : 'المشروع'} {selected.num}
                  </span>
                  <span className="hidden text-[10px] font-mono tracking-wider text-[var(--color-mist)] sm:block">{selected.year}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMapDossierOpen(false)}
                  aria-label={language === 'fr' ? 'Fermer le dossier' : language === 'en' ? 'Close dossier' : 'إغلاق الملف'}
                  className="rounded-full p-2 transition-colors hover:bg-[var(--color-paper)]"
                >
                  <X className="h-5 w-5 text-[var(--color-graphite)]" />
                </button>
              </div>

              <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-x-10 lg:p-12">
                <div className="relative flex min-h-[270px] items-center justify-center overflow-hidden rounded-2xl bg-[#0a0e12] p-8 text-center lg:sticky lg:top-24 lg:h-[390px] lg:self-start">
                  <img src={selectedPlaceholder} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-[#08111d]/25" />
                </div>

                <motion.div
                  className="space-y-7 lg:pt-1"
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-[var(--color-mist)]">
                      <span>{selected.client}</span><span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                      <span>{selected.location}</span><span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                      <span>{selected.year}</span>
                    </div>
                    <h2 id="map-dossier-title" className="display-md text-[var(--color-ink)]">
                      {language === 'en' ? selected.nameEn : language === 'ar' ? selected.nameEn : selected.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-graphite)]">
                      <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                      <span>{language === 'fr' ? 'Projet cartographique pour' : language === 'en' ? 'Mapped project for' : 'مشروع على الخريطة لصالح'} <strong className="font-semibold text-[var(--color-ink)]">{selected.client}</strong></span>
                    </div>
                  </div>

                  <p className="text-base leading-[1.7] text-[var(--color-graphite)] lg:text-lg">
                    {language === 'en' ? selected.scopeEn : selected.scope}
                  </p>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-y border-[rgba(10,12,13,0.1)] py-5">
                    {[
                      { label: language === 'fr' ? 'Année' : language === 'en' ? 'Year' : 'السنة', value: selected.year },
                      { label: language === 'fr' ? 'Secteur' : language === 'en' ? 'Sector' : 'القطاع', value: selected.sector },
                      { label: language === 'fr' ? 'Localisation' : language === 'en' ? 'Location' : 'الموقع', value: selected.location },
                      { label: 'Dossier', value: `MAP/${selected.year}-${selected.num}` },
                    ].map((item) => (
                      <div key={item.label}><span className="mb-1 block text-[9px] font-mono uppercase tracking-widest text-[var(--color-mist)]">{item.label}</span><span className="block text-sm font-semibold text-[var(--color-ink)]">{item.value}</span></div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-mist)]">
                      {language === 'fr' ? 'Périmètre des travaux' : language === 'en' ? 'Scope of works' : 'نطاق الأعمال'}
                    </h3>
                    <div className="flex items-start gap-3 text-[var(--color-charcoal)]">
                      <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      <span className="text-sm leading-relaxed">{language === 'en' ? selected.scopeEn : selected.scope}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="border-t border-[rgba(10,12,13,0.06)] bg-white/95 px-6 py-4 sm:px-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <p className="text-center text-sm text-[var(--color-mist)] sm:text-left">
                    {language === 'fr' ? 'Dossier cartographique — photographie officielle en attente.' : language === 'en' ? 'Map dossier — official photography pending.' : 'ملف الخريطة — الصورة الرسمية قيد الانتظار.'}
                  </p>
                  <a href="#contact-form" onClick={() => setMapDossierOpen(false)} className="btn-premium shrink-0 text-xs">
                    <span>{language === 'fr' ? 'Discuter d’un projet similaire' : language === 'en' ? 'Discuss similar project' : 'ناقش مشروعاً مماثلاً'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
