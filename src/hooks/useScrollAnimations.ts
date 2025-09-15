import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const fadeInUp = (element: RefObject<HTMLElement> | HTMLElement | string, options = {}) => {
    const defaults = {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      start: "top 80%",
      ...options
    };

    gsap.fromTo(element, 
      { opacity: 0, y: defaults.y },
      {
        opacity: 1,
        y: 0,
        duration: defaults.duration,
        ease: defaults.ease,
        scrollTrigger: {
          trigger: element,
          start: defaults.start,
          toggleActions: "play none none reverse"
        }
      }
    );
  };

  const fadeInLeft = (element: RefObject<HTMLElement> | HTMLElement | string, options = {}) => {
    const defaults = {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      start: "top 75%",
      ...options
    };

    gsap.fromTo(element, 
      { opacity: 0, x: defaults.x },
      {
        opacity: 1,
        x: 0,
        duration: defaults.duration,
        ease: defaults.ease,
        scrollTrigger: {
          trigger: element,
          start: defaults.start,
          toggleActions: "play none none reverse"
        }
      }
    );
  };

  const fadeInRight = (element: RefObject<HTMLElement> | HTMLElement | string, options = {}) => {
    const defaults = {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      start: "top 75%",
      ...options
    };

    gsap.fromTo(element, 
      { opacity: 0, x: defaults.x },
      {
        opacity: 1,
        x: 0,
        duration: defaults.duration,
        ease: defaults.ease,
        scrollTrigger: {
          trigger: element,
          start: defaults.start,
          toggleActions: "play none none reverse"
        }
      }
    );
  };

  const staggerAnimation = (elements: HTMLElement[] | NodeListOf<Element>, options = {}) => {
    const defaults = {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      start: "top 75%",
      ...options
    };

    gsap.fromTo(elements, 
      { opacity: 0, y: defaults.y, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: defaults.duration,
        ease: defaults.ease,
        stagger: defaults.stagger,
        scrollTrigger: {
          trigger: elements[0] || elements,
          start: defaults.start,
          toggleActions: "play none none reverse"
        }
      }
    );
  };

  const scaleIn = (element: RefObject<HTMLElement> | HTMLElement | string, options = {}) => {
    const defaults = {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      start: "top 80%",
      ...options
    };

    gsap.fromTo(element, 
      { opacity: 0, scale: defaults.scale },
      {
        opacity: 1,
        scale: 1,
        duration: defaults.duration,
        ease: defaults.ease,
        scrollTrigger: {
          trigger: element,
          start: defaults.start,
          toggleActions: "play none none reverse"
        }
      }
    );
  };

  return {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    staggerAnimation,
    scaleIn
  };
};