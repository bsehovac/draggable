const Draggable = ( () => {

  window.addEventListener( 'touchmove', () => {} )

  class V2 {

    constructor( x, y ) {

      this.x = x
      this.y = y

    }

    set( x, y ) {

      this.x = x
      this.y = y

      return this

    }

    clone( v ) {

      this.x = v.x
      this.y = v.y

      return this

    }

    add( v ) {

      this.x += v.x
      this.y += v.y

      return this

    }

    sub( v ) {

      this.x -= v.x
      this.y -= v.y

      return this

    }

  }

  return class {

    constructor( element, callbacks, vector ) {

      this.callbacks = Object.assign( {
        start() {},
        move() {},
        end() {},
      }, callbacks || {} )

      this.start = this.start.bind( this )
      this.move = this.move.bind( this )
      this.end = this.end.bind( this )

      this.vector = vector || V2

      this.position = {
        current: new this.vector,
        start: new this.vector,
        delta: new this.vector,
        drag: new this.vector,
        old: new this.vector,
      }

      element.addEventListener( 'mousedown', this.start, false )
      element.addEventListener( 'touchstart', this.start, false )

    }

    start( e ) {

      const touch = e.type === 'touchstart'

      if ( !touch && e.which !== 1 ) return
      if ( touch && e.touches.length > 1 ) return

      this.getPosition( e )

      this.position.delta.set( 0, 0 )
      this.position.drag.set( 0, 0 )
      this.position.start.clone( this.position.current )
      this.callbacks.start( this.position )

      window.addEventListener( ( touch ? 'touchmove' : 'mousemove' ), this.move, { passive: false } )
      window.addEventListener( ( touch ? 'touchend' : 'mouseup' ), this.end, false )

    }

    move( e ) {

      this.position.old.clone( this.position.current )

      this.getPosition( e )

      this.position.delta.clone( this.position.current ).sub( this.position.old )
      this.position.drag.clone( this.position.current ).sub( this.position.start )
      this.callbacks.move( this.position )

    }

    end( e ) {

      const touch = e.type === 'touchstart'

      this.getPosition( e )
      
      this.callbacks.end( this.position )

      window.removeEventListener( ( touch ? 'touchmove' : 'mousemove' ), this.move, { passive: false } )
      window.removeEventListener( ( touch ? 'touchend' : 'mouseup' ), this.end, false )

    }

    getPosition( e ) {

      const dragEvent = e.touches ? ( e.touches[0] || e.changedTouches[0] ) : e
      this.position.current.set( dragEvent.pageX, dragEvent.pageY )

    }

  }

} )()

export default Draggable