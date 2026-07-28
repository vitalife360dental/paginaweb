// oenvia - Scroll Transitions & Interactive Animations

document.addEventListener('DOMContentLoaded', () => {
    // ACELERACIÓN GLOBAL DE VIDEOS (1.5x)
    const accelerateAllVideos = () => {
        document.querySelectorAll('video').forEach(video => {
            video.playbackRate = 1.5;
        });
    };
    accelerateAllVideos();
    
    const heroLeft = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');
    const videoContainer = document.querySelector('.video-container');
    const toothVideo = document.querySelector('.tooth-video');
    const glowBg = document.querySelector('.glow-bg');
    const secondVideoWrapper = document.querySelector('.second-video-wrapper');
    const thirdVideoWrapper = document.querySelector('.third-video-wrapper');
    const fourthVideoWrapper = document.querySelector('.fourth-video-wrapper');
    const fifthVideoWrapper = document.querySelector('.fifth-video-wrapper');
    const implantCrown = document.getElementById('implant-crown');
    const implantScrew = document.getElementById('implant-screw');
    const orthoToothLeft = document.getElementById('ortho-tooth-left');
    const orthoToothRight = document.getElementById('ortho-tooth-right');
    const orthoToothCenter = document.getElementById('ortho-tooth-center');
    const orthoWire = document.getElementById('ortho-wire');
    const smileCornerTl = document.getElementById('smile-corner-tl');
    const smileCornerTr = document.getElementById('smile-corner-tr');
    const smileCornerBl = document.getElementById('smile-corner-bl');
    const smileCornerBr = document.getElementById('smile-corner-br');
    const smileContourGroup = document.getElementById('smile-contour-group');
    const smileArc = document.getElementById('smile-arc');
    const smileAxes = document.getElementById('smile-axes');
    const smileScanLine = document.getElementById('smile-scan-line');
    const smileTeethContour = document.getElementById('smile-teeth-contour');
    const smileTeethDividers = document.getElementById('smile-teeth-dividers');
    const smileLipUpper = document.getElementById('smile-lip-upper');
    const smileLipLower = document.getElementById('smile-lip-lower');
    
    // Selectores específicos de la animación de cirugía
    const surgeryRings = document.getElementById('surgery-rings');
    const surgeryCross = document.getElementById('surgery-cross');
    const surgeryTooth = document.getElementById('surgery-tooth');
    const surgeryTargetTicks = document.getElementById('surgery-target-ticks');

    // Selectores de Secciones para el cálculo dinámico de scroll
    const smileSection = document.getElementById('servicios');
    const orthoSection = document.getElementById('ortodoncia');
    const implantSection = document.getElementById('implantes');
    const cirugiaSection = document.getElementById('cirugia-bucal');

    // Selectores para el Overlay de Agenda (Gota de Pintura)
    const btnAgenda = document.getElementById('btn-agenda');
    const agendaOverlay = document.getElementById('agenda-overlay');
    const dropletTooth = document.getElementById('droplet-tooth');
    const closeAgenda = document.getElementById('close-agenda');

    // Función auxiliar para obtener el progreso de scroll dinámico de una sección
    function getSectionScrollProgress(section) {
        if (!section) return 0;
        const rect = section.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        // La animación comienza cuando el borde superior de la sección está al 85% de la altura del viewport
        const start = viewHeight * 0.85;
        // La animación termina de completarse cuando el borde superior de la sección sube al 15% del viewport
        const end = viewHeight * 0.15;
        const total = start - end;
        const current = start - rect.top;
        return Math.min(Math.max(current / total, 0), 1);
    }

    // Handle Scroll Transitions using requestAnimationFrame
    function updateScrollAnimations() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        
        // Progress of scroll in the first viewport (0 to 1)
        const progress = Math.min(Math.max(scrollY / vh, 0), 1);

        // 1. Phased Animation: Centered Zoom, Exit Left, Re-enter Small Left
        if (videoContainer && toothVideo) {
            if (progress < 1) {
                videoContainer.style.display = 'flex';
                let left, top, scale, opacity;

                if (progress < 0.35) {
                    // FASE 1 (0% a 35% scroll): Zoom centrado para ver el salpicado en 3D de la muela
                    const t = progress / 0.35; // t de 0 a 1
                    left = 50;
                    top = 50;
                    scale = 1.0 + (t * 0.45); // Crece de 1.0x a 1.45x manteniéndose en el centro
                    opacity = 0.95;
                } else if (progress >= 0.35 && progress < 0.65) {
                    // FASE 2 (35% a 65% scroll): Se desplaza completamente a la izquierda fuera de la pantalla
                    const t = (progress - 0.35) / 0.30; // t de 0 a 1
                    left = 50 - (t * 100);     // Va de 50% a -50% (totalmente fuera de la pantalla)
                    top = 50 - (t * 2);        // Movimiento vertical mínimo
                    scale = 1.45 - (t * 0.4);  // Encoge un poco (1.45x a 1.05x)
                    opacity = 0.95 - (t * 0.95); // Se desvanece por completo a 0
                } else {
                    // FASE 3: El primer video permanece oculto (opacidad 0) ya que entra el segundo video en la sección 2
                    const t = (progress - 0.65) / 0.35;
                    left = -50 + (t * 78);
                    top = 48 + (t * 12);
                    scale = 0.45 + (t * 0.2);
                    opacity = 0; // Se oculta para dar paso al video de la segunda sección
                }

                videoContainer.style.left = `${left}%`;
                videoContainer.style.top = `${top}%`;
                videoContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
                toothVideo.style.opacity = opacity;
            } else {
                // Ocultar primer video cuando se pasa de la primera sección
                videoContainer.style.display = 'none';
            }
        }

        // 2. Slide and fade out left/right columns in Hero
        if (heroLeft) {
            const translateX = progress * -180; // Slides left
            const opacity = 1 - (progress * 2.0); // Fades out completely by 50% scroll
            heroLeft.style.transform = `translateX(${translateX}px)`;
            heroLeft.style.opacity = Math.max(opacity, 0);
        }

        if (heroRight) {
            const translateX = progress * 180; // Slides right
            const opacity = 1 - (progress * 2.0);
            heroRight.style.transform = `translateX(${translateX}px)`;
            heroRight.style.opacity = Math.max(opacity, 0);
        }

        // 3. Radial Glow expansion and journey along with the video
        if (glowBg) {
            if (progress < 1) {
                glowBg.style.display = 'block';
                let left, top, scale, opacity;

                if (progress < 0.35) {
                    const t = progress / 0.35;
                    left = 50;
                    top = 50;
                    scale = 1.0 + (t * 0.2);
                    opacity = 0.45;
                } else if (progress >= 0.35 && progress < 0.65) {
                    const t = (progress - 0.35) / 0.30;
                    left = 50 - (t * 100);
                    top = 50 - (t * 2);
                    scale = 1.2 - (t * 0.5);
                    opacity = 0.45 * (1 - t);
                } else {
                    const t = (progress - 0.65) / 0.35;
                    left = -50 + (t * 78);
                    top = 48 + (t * 12);
                    scale = 0.5 + (t * 0.25);
                    opacity = t * 0.35; // Resplandor turquesa suave acompañante
                }

                glowBg.style.left = `${left}%`;
                glowBg.style.top = `${top}%`;
                glowBg.style.transform = `translate(-50%, -50%) scale(${scale})`;
                glowBg.style.opacity = opacity;
            } else {
                const extraScroll = scrollY - vh;
                const top = 60 - (extraScroll / vh * 80);
                const opacity = Math.max(0.35 - (extraScroll / (vh * 0.4)), 0);

                if (opacity <= 0) {
                    glowBg.style.display = 'none';
                } else {
                    glowBg.style.display = 'block';
                    glowBg.style.left = '28%';
                    glowBg.style.top = `${top}%`;
                    glowBg.style.transform = 'translate(-50%, -50%) scale(0.75)';
                    glowBg.style.opacity = opacity;
                }
            }
        }

        // 4. Animación del segundo video (gotas de fondo) dirigida por scroll (sin aparecer de lados, centrado en el fondo)
        if (secondVideoWrapper) {
            const progress2 = getSectionScrollProgress(smileSection);
            const scale = 0.8 + (progress2 * 0.4); // Zoom suave de 0.8x a 1.2x
            const opacity = progress2 * 0.95;      // Aparece progresivamente con el scroll

            secondVideoWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
            secondVideoWrapper.style.opacity = opacity;
        }

        // 5. Animación del tercer video (gotas horizontales) de Ortodoncia dirigida por scroll
        if (thirdVideoWrapper) {
            const progress3 = getSectionScrollProgress(orthoSection);
            const scale = 0.8 + (progress3 * 0.4); // Zoom suave de 0.8x a 1.2x
            const opacity = progress3 * 0.95;      // Aparece progresivamente con el scroll

            thirdVideoWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
            thirdVideoWrapper.style.opacity = opacity;
        }

        // 6. Animación del cuarto video (Implantes Dentales) de fondo dirigida por scroll
        if (fourthVideoWrapper) {
            const progress4 = getSectionScrollProgress(implantSection);
            const scale = 0.8 + (progress4 * 0.4); // Zoom suave de 0.8x a 1.2x
            const opacity = progress4 * 0.95;      // Aparece progresivamente con el scroll

            fourthVideoWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
            fourthVideoWrapper.style.opacity = opacity;
        }

        // 6.5 Animación del quinto video (Cirugía Bucal) de fondo dirigida por scroll
        if (fifthVideoWrapper) {
            const progress5 = getSectionScrollProgress(cirugiaSection);
            const scale = 0.8 + (progress5 * 0.4); // Zoom suave de 0.8x a 1.2x
            const opacity = progress5 * 0.95;      // Aparece progresivamente con el scroll

            fifthVideoWrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
            fifthVideoWrapper.style.opacity = opacity;
        }

        // 7. Animación interactiva de ensamble del Icono de Implante SVG por scroll
        if (implantCrown && implantScrew) {
            const progressImplant = getSectionScrollProgress(implantSection);
            const offset = 50 * (1 - progressImplant); // Se ensamblan de 50px a 0px de desfase
            
            implantCrown.style.transform = `translateY(${-offset}px)`;
            implantScrew.style.transform = `translateY(${offset}px)`;
        }

        // 7.5 Animación interactiva del Icono de Cirugía Bucal SVG por scroll
        if (surgeryRings && surgeryCross && surgeryTooth && surgeryTargetTicks) {
            const progressSurgery = getSectionScrollProgress(cirugiaSection);
            
            // Los anillos rotan
            surgeryRings.style.transform = `rotate(${progressSurgery * 45}deg) scale(${0.7 + progressSurgery * 0.3})`;
            // La cruz de precisión aparece gradualmente
            surgeryCross.style.opacity = progressSurgery;
            // El diente principal escala suavemente
            surgeryTooth.style.transform = `scale(${0.8 + progressSurgery * 0.2})`;
            // Las miras de calibración se contraen hacia el diente
            surgeryTargetTicks.style.transform = `scale(${1.2 - progressSurgery * 0.2})`;
        }

        // 8. Animación interactiva de alineación del Icono de Ortodoncia SVG por scroll
        if (orthoToothLeft && orthoToothRight && orthoToothCenter && orthoWire) {
            const progressOrtho = getSectionScrollProgress(orthoSection);
            
            // Configurar el dasharray del alambre para el efecto de enhebrado
            const wireLength = 220;
            orthoWire.style.strokeDasharray = wireLength;

            if (progressOrtho < 0.4) {
                // FASE A: Los dientes siguen chuecos y el alambre se "enhebra" de izquierda a derecha
                const tWire = progressOrtho / 0.4; // de 0 a 1
                
                orthoWire.style.opacity = tWire;
                orthoWire.style.strokeDashoffset = wireLength * (1 - tWire);
                
                // Dientes 100% desalineados (muy chuecos para que se note claramente el defecto inicial)
                orthoToothLeft.style.transform = 'rotate(-20deg) translateX(-14px) translateY(8px)';
                orthoToothRight.style.transform = 'rotate(20deg) translateX(14px) translateY(8px)';
                orthoToothCenter.style.transform = 'rotate(12deg) translateY(18px)';
                
                // Alambre curvo de enhebrado
                orthoWire.setAttribute('d', 'M 40,110 Q 150,160 260,110');
            } else {
                // FASE B: El alambre está totalmente puesto. Al seguir bajando, se tensa y alinea los dientes
                const tAlign = (progressOrtho - 0.4) / 0.6; // de 0 a 1
                const inv = 1 - tAlign;
                
                orthoWire.style.opacity = 1;
                orthoWire.style.strokeDashoffset = 0;
                
                // Dientes se alinean progresivamente hasta volver a 0 (perfectamente alineados)
                orthoToothLeft.style.transform = `rotate(${-20 * inv}deg) translateX(${-14 * inv}px) translateY(${8 * inv}px)`;
                orthoToothRight.style.transform = `rotate(${20 * inv}deg) translateX(${14 * inv}px) translateY(${8 * inv}px)`;
                orthoToothCenter.style.transform = `rotate(${12 * inv}deg) translateY(${18 * inv}px)`;
                
                // El alambre se endereza dinámicamente de muy curvo a recto
                const controlY = 110 + (50 * inv);
                orthoWire.setAttribute('d', `M 40,110 Q 150,${controlY} 260,110`);
            }
        }

        // 9. Animación interactiva de calibración del Icono de Diseño de Sonrisa SVG por scroll
        if (smileCornerTl && smileCornerTr && smileCornerBl && smileCornerBr && smileContourGroup && smileArc && smileAxes) {
            const progressSmile = getSectionScrollProgress(smileSection);
            const inv = 1 - progressSmile;

            // Las esquinas de calibración (enfoque) se cierran sobre la sonrisa de 20px a 0px
            smileCornerTl.style.transform = `translate(${-20 * inv}px, ${-20 * inv}px)`;
            smileCornerTr.style.transform = `translate(${20 * inv}px, ${-20 * inv}px)`;
            smileCornerBl.style.transform = `translate(${-20 * inv}px, ${20 * inv}px)`;
            smileCornerBr.style.transform = `translate(${20 * inv}px, ${20 * inv}px)`;

            // El contorno de la sonrisa se escala suavemente y aumenta opacidad
            const scale = 0.85 + (progressSmile * 0.15);
            smileContourGroup.style.transform = `scale(${scale})`;
            smileContourGroup.style.opacity = 0.3 + (progressSmile * 0.7);

            // Las guías de simetría (ejes) y el arco estético se desvanecen/aparecen y se desplazan
            smileAxes.style.opacity = progressSmile * 0.6;
            smileArc.style.opacity = progressSmile * 0.7;
            smileArc.style.transform = `translateY(${15 * inv}px)`;

            // Barrido de la línea láser horizontal de escaneo
            if (smileScanLine) {
                const scanY = 40 + (progressSmile * 120); // Recorrido de y=40 a y=160
                const scanOpacity = Math.sin(progressSmile * Math.PI) * 0.95; // Campana de Gauss para aparecer y desaparecer suavemente
                smileScanLine.setAttribute('y1', scanY);
                smileScanLine.setAttribute('y2', scanY);
                smileScanLine.style.opacity = scanOpacity;
            }

            // Dinámica interactiva de morphing de sonrisa fea/chueca a hermosa/alineada
            if (smileTeethContour && smileTeethDividers && smileLipUpper && smileLipLower) {
                // Morphing del labio superior
                const y_side = 95 + (11 * inv);
                const y_arch_l = 85 + (13 * inv);
                const y_arch_r = 85 + (7 * inv);
                const y_dip = 93 + (8 * inv);
                const y_under_l = 105 + (9 * inv);
                const y_under_r = 105 + (6 * inv);
                const y_under_mid = 100 + (7 * inv);
                const upperLipD = `M 80,${y_side} C 100,${y_arch_l} 130,${y_arch_l} 150,${y_dip} C 170,${y_arch_r} 200,${y_arch_r} 220,${y_side} C 190,${y_under_l} 170,${y_under_l} 150,${y_under_mid} C 130,${y_under_r} 110,${y_under_r} 80,${y_side} Z`;
                smileLipUpper.setAttribute('d', upperLipD);

                // Morphing del labio inferior
                const y_lower = 135 - (20 * inv);
                const y_lower_cp_l = 135 - (23 * inv);
                const y_lower_cp_r = 135 - (15 * inv);
                const y_upper_cp_l = 120 - (8 * inv);
                const y_upper_cp_r = 120 - (12 * inv);
                const lowerLipD = `M 80,${y_side} C 110,${y_lower_cp_l} 190,${y_lower_cp_r} 220,${y_side} C 185,${y_upper_cp_l} 115,${y_upper_cp_r} 80,${y_side} Z`;
                smileLipLower.setAttribute('d', lowerLipD);

                // Morphing de la curvatura dental general (alineación)
                const y_teeth_corner_l = 95 + (11 * inv);
                const y_teeth_corner_r = 95 + (5 * inv);
                const y_teeth_upper_mid = 98 + (14 * inv);
                const y_teeth_lower_mid = 118 + (8 * inv);
                const y_teeth_lower_cp_l = 115 + (7 * inv);
                const y_teeth_lower_cp_r = 115 + (5 * inv);
                const teethD = `M 95,${y_teeth_corner_l} Q 120,${y_teeth_upper_mid} 150,${y_teeth_upper_mid} Q 180,${y_teeth_upper_mid} 205,${y_teeth_corner_r} Q 195,${y_teeth_lower_cp_r} 150,${y_teeth_lower_mid} Q 105,${y_teeth_lower_cp_l} 95,${y_teeth_corner_l} Z`;
                smileTeethContour.setAttribute('d', teethD);

                // Morphing de los separadores de dientes individuales
                const topY1 = 96 + (8 * inv);
                const botY1 = 108 + (8 * inv);
                const topY2 = 97 + (11 * inv);
                const botY2 = 113 + (9 * inv);
                const topY3 = 98 + (14 * inv);
                const botY3 = 115 + (11 * inv);
                const topY4 = 97 + (11 * inv);
                const botY4 = 113 + (7 * inv);
                const topY5 = 96 + (8 * inv);
                const botY5 = 108 + (6 * inv);
                const dividersD = `M 120,${topY1} V ${botY1} M 135,${topY2} V ${botY2} M 150,${topY3} V ${botY3} M 165,${topY4} V ${botY4} M 180,${topY5} V ${botY5}`;
                smileTeethDividers.setAttribute('d', dividersD);
            }
        }
    }

    // Bind scroll handler
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateScrollAnimations);
    });

    // Run once at start to position correctly if page is reloaded scrolled down
    updateScrollAnimations();

    // Intersection Observer for scroll-animated elements in Section 2
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Si entra la sección de equipo, sincronizar la colisión del video y el sacudón
                if (entry.target.classList.contains('team-section')) {
                    const teamGrid = entry.target.querySelector('.team-grid');
                    const teamBgVideo = entry.target.querySelector('.team-bg-video');
                    
                    // Reiniciar y reproducir el video de fondo
                    if (teamBgVideo) {
                        teamBgVideo.currentTime = 0;
                        teamBgVideo.playbackRate = 1.5; // Asegurar velocidad 1.5x
                        teamBgVideo.play();
                    }
                    
                    // Limpiar timeouts previos por seguridad
                    if (entry.target.shakeTimeout) clearTimeout(entry.target.shakeTimeout);
                    if (entry.target.removeShakeTimeout) clearTimeout(entry.target.removeShakeTimeout);
                    
                    // Ajustado de 3.2s a 2.13s debido a la velocidad de 1.5x del video
                    entry.target.shakeTimeout = setTimeout(() => {
                        // 1. Sacudón grande en la sección (¡Boom!)
                        entry.target.classList.add('shockwave-shake');
                        
                        // 2. Liberar inmediatamente las tarjetas hacia afuera
                        if (teamGrid) {
                            teamGrid.classList.add('reveal-cards');
                        }
                        
                        // Quitar la clase del sacudón tras la animación (0.5s)
                        entry.target.removeShakeTimeout = setTimeout(() => {
                            entry.target.classList.remove('shockwave-shake');
                        }, 500);
                    }, 2130);
                } else {
                    // Solo dejamos de observar elementos simples que no son repetitivos
                    observer.unobserve(entry.target);
                }
            } else {
                // Si sale de pantalla la sección de equipo, reiniciamos el estado para que pueda volver a animarse al volver
                if (entry.target.classList.contains('team-section')) {
                    entry.target.classList.remove('visible');
                    const teamGrid = entry.target.querySelector('.team-grid');
                    if (teamGrid) {
                        teamGrid.classList.remove('reveal-cards');
                    }
                    const teamBgVideo = entry.target.querySelector('.team-bg-video');
                    if (teamBgVideo) {
                        teamBgVideo.pause();
                        teamBgVideo.currentTime = 0;
                    }
                    if (entry.target.shakeTimeout) clearTimeout(entry.target.shakeTimeout);
                    if (entry.target.removeShakeTimeout) clearTimeout(entry.target.removeShakeTimeout);
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        elementObserver.observe(el);
    });

    // ==========================================
    // Control Sincronizado de Video de Testimonios
    // ==========================================
    const testimoniosSection = document.getElementById('testimonios');
    if (testimoniosSection) {
        const testVideo = testimoniosSection.querySelector('.testimonials-video-bg');
        let transitionTriggered = false;
        let fallbackTimeout = null;

        // SEGUNDOS CLAVE: Ajustar si el momento de estampar la pantalla varía
        const REVEAL_TIME_SECONDS = 6.2; 

        // Función para activar la transición de revelado
        const triggerTransition = () => {
            if (transitionTriggered) return;
            transitionTriggered = true;
            
            // Cancelar el temporizador de respaldo si se dispara
            if (fallbackTimeout) {
                clearTimeout(fallbackTimeout);
                fallbackTimeout = null;
            }

            // 1. Iniciar la expansión del destello de la mancha de pintura blanca
            testimoniosSection.classList.add('paint-flash');
            
            // 2. Revelar las tarjetas con efecto Glassmorphism en cascada
            setTimeout(() => {
                testimoniosSection.classList.add('reveal-active');
            }, 200); // Reducido a 200ms para acelerar la entrada tras el destello
        };

        const testObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    transitionTriggered = false;
                    
                    // Failsafe / Plan de Respaldo: Si el video no se reproduce o el navegador bloquea la acción,
                    // forzamos la revelación de los testimonios automáticamente a los 4.2 segundos (ajustado por 1.5x).
                    fallbackTimeout = setTimeout(() => {
                        console.log("Failsafe: Activando transición de testimonios por temporizador de respaldo.");
                        triggerTransition();
                    }, 4200);

                    if (testVideo) {
                        testVideo.currentTime = 0;
                        testVideo.playbackRate = 1.5; // Asegurar velocidad 1.5x
                        const playPromise = testVideo.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(err => {
                                console.warn("La reproducción automática del video fue bloqueada por el navegador:", err);
                                // Si se bloquea la reproducción de inmediato, disparamos la transición antes
                                clearTimeout(fallbackTimeout);
                                fallbackTimeout = setTimeout(triggerTransition, 1500);
                            });
                        }
                    }
                } else {
                    // Pausar y resetear clases cuando la sección sale de la pantalla
                    if (testVideo) {
                        testVideo.pause();
                    }
                    if (fallbackTimeout) {
                        clearTimeout(fallbackTimeout);
                        fallbackTimeout = null;
                    }
                    testimoniosSection.classList.remove('paint-flash', 'reveal-active');
                    transitionTriggered = false;
                }
            });
        }, {
            threshold: 0.10, // Umbral un poco más sensible
            rootMargin: '0px 0px -50px 0px'
        });

        testObserver.observe(testimoniosSection);

        if (testVideo) {
            testVideo.addEventListener('timeupdate', () => {
                // Dispara cuando el video llega al segundo de la mancha de pintura
                if (testVideo.currentTime >= REVEAL_TIME_SECONDS) {
                    triggerTransition();
                }
            });
        }
    }

    // Manejo de la animación interactiva de gota de pintura blanca para agendar cita
    // Desactivado temporalmente para permitir redirección a la landing page contacto.html
    /*
    if (btnAgenda && agendaOverlay && dropletTooth) {
        btnAgenda.addEventListener('click', (e) => {
            e.preventDefault();
            // 1. Activar el overlay
            agendaOverlay.classList.add('active');
        });
    }
    */

    if (closeAgenda && agendaOverlay && dropletTooth) {
        closeAgenda.addEventListener('click', () => {
            // 1. Desvanecer el contenido primero para despejar la vista
            const content = agendaOverlay.querySelector('.agenda-content');
            if (content) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
            }
            
            // 2. Forzar contracción de la muela
            dropletTooth.style.transform = 'scale(0)';
            
            // 3. Desactivar el overlay después de la contracción completa
            setTimeout(() => {
                agendaOverlay.classList.remove('active');
                // Limpiar estilos inline para la siguiente apertura
                if (content) {
                    content.style.opacity = '';
                    content.style.transform = '';
                }
                dropletTooth.style.transform = '';
            }, 850); // 850ms coincide con la transición CSS
        });
    }
});
