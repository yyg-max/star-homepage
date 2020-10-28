import {
  Program,
  Geometry,
  Mesh,
  OGLRenderingContext,
  Texture,
} from 'ogl-typescript'
import vertex from './particles.vert'
import fragment from './particles.frag'

export interface IParticlesAttributes {
  colors: ArrayLike<number>
  opacities: ArrayLike<number>
  positions: ArrayLike<number>
  randoms: ArrayLike<number>
  sizes: ArrayLike<number>
  texture: Texture
  uHeight: {
    value: number
  }
}

export function createParticles(
  gl: OGLRenderingContext,
  attributes: IParticlesAttributes
) {
  const {
    colors,
    opacities,
    positions,
    randoms,
    sizes,
    texture,
    uHeight,
  } = attributes

  const geometry = new Geometry(gl, {
    color: { size: 3, data: colors },
    opacity: { size: 1, data: opacities },
    position: { size: 3, data: positions },
    random: { size: 1, data: randoms },
    size: { size: 1, data: sizes },
  })

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTexture: {
        value: texture,
      },
      uHeight,
    },
    transparent: true,
    depthTest: false,
  })

  const mesh = new Mesh(gl, {
    mode: gl.POINTS,
    geometry,
    program,
  })

  return mesh
}
