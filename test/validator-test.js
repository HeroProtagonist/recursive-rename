import expect from 'expect'
import Validator from '../src/validator'

describe.only('Validator', () => {
  describe('from node receiving options', () => {
    xit('should create instance', () => {
      const validator = new Validator()

      expect(validator).toExist()
      expect(validator.constructor).toBe(Validator)
    })

    describe('#_determineExtensions', () => {

      it('errors if only src is provided', () => {
        try {
          const validator = new Validator(undefined, 'src')
        } catch (e) {
          expect(e.message).toEqual('A source and destination are required')
        }
      })

      it('errors if only dest is provided', () => {
        try {
          const validator = new Validator(undefined, undefined, 'dest')
        } catch (e) {
          expect(e.message).toEqual('A source and destination are required')
        }
      })

      it('sets src and dest when both are supplied', () => {
        const validator = new Validator(undefined, 'jsx', 'js')
        expect(validator.src).toBe('jsx')
        expect(validator.dest).toBe('js')
      })

    })

    describe('Including Options', () => {

      it('errors if not supplied an object', () => {
        const errors = []
        try {
          new Validator(undefined, 'jsx', 'js', 123)
        } catch (e) {
          errors.push(e)
        }

        try {
          new Validator(undefined, 'jsx', 'js', '123')
        } catch (e) {
          errors.push(e)
        }

        try {
          new Validator(undefined, 'jsx', 'js', '123')
        } catch (e) {
          errors.push(e)
        }

        expect(errors[0].message).toEqual('When supplied options they must be an object')
        expect(errors.length).toEqual(3)
///error arrays
// error overide
      })
    })

    describe('#_handleOptions', () => {
      const excludesSpy = expect.spyOn(Validator.prototype, '_handleExcludes')
      const overridesSpy = expect.spyOn(Validator.prototype, '_handleOverrides')

      afterEach(() => {
        excludesSpy.reset()
        overridesSpy.reset()
      })

      it('calls proper functions when provided only exlude options', () => {
        const excludes = [1, 2, 3]
        const validator = new Validator(undefined, 'jsx', 'js', { excludes })

        expect(excludesSpy.calls.length).toBe(1)
        expect(excludesSpy).toHaveBeenCalledWith(excludes)

        expect(overridesSpy.calls.length).toBe(0)
      })

      it('calls proper functions when provided only override options', () => {
        const override = [1, 2, 3]
        const validator = new Validator(undefined, 'jsx', 'js', { excludes })

        expect(excludesSpy.calls.length).toBe(1)
        expect(excludesSpy).toHaveBeenCalledWith(excludes)

        expect(overridesSpy.calls.length).toBe(0)
      })


    })

  })
})
