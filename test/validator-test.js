import expect from 'expect'
import Validator from '../src/validator'

describe('Validator', () => {
  describe('from node receiving options', () => {
    it('should create instance', () => {
      const validator = new Validator('src', 'dest')

      expect(validator).toExist()
      expect(validator.constructor).toBe(Validator)
    })

    describe('#_determineExtensions', () => {

      it('errors if only src is provided', () => {
        let error
        try {
          const validator = new Validator(undefined, 'src')
        } catch (e) {
          error = e
        }
        expect(error.message).toEqual('A source and destination are required')
      })

      it('errors if only dest is provided', () => {
        let error
        try {
          const validator = new Validator(undefined, undefined, 'dest')
        } catch (e) {
          error = e
        }
        expect(error.message).toEqual('A source and destination are required')
      })

      it('sets src and dest when both are supplied', () => {
        const validator = new Validator('jsx', 'js')
        expect(validator.src).toBe('jsx')
        expect(validator.dest).toBe('js')
      })
    })

    describe('Including Options', () => {
      it('errors if not supplied an object', () => {
        const errors = []
        try {
          new Validator('jsx', 'js', 123)
        } catch (e) {
          errors.push(e)
        }

        try {
          new Validator('jsx', 'js', '123')
        } catch (e) {
          errors.push(e)
        }

        try {
          new Validator('jsx', 'js', '123')
        } catch (e) {
          errors.push(e)
        }

        expect(errors[0].message).toEqual('When supplied options they must be an object')
        expect(errors.length).toEqual(3)
      })
    })

    describe('#_handleOptions', () => {
      const excludesSpy = expect.spyOn(Validator.prototype, '_handleExcludes')
      const overridesSpy = expect.spyOn(Validator.prototype, '_handleOverride')

      afterEach(() => {
        excludesSpy.reset()
        overridesSpy.reset()
      })

      it('calls proper functions when provided only exlude options', () => {
        const excludes = [1, 2, 3]
        const validator = new Validator('jsx', 'js', { excludes })

        expect(excludesSpy.calls.length).toBe(1)
        expect(excludesSpy).toHaveBeenCalledWith(excludes)

        expect(overridesSpy.calls.length).toBe(0)
      })

      it('calls proper functions when provided only override options', () => {
        const override = [1, 2, 3]
        const validator = new Validator('jsx', 'js', { override })

        expect(overridesSpy.calls.length).toBe(1)
        expect(overridesSpy).toHaveBeenCalledWith(override)

        expect(excludesSpy.calls.length).toBe(0)
      })

      after(() => {
        expect.restoreSpies()
      })
    })

    describe('#_handleExcludes', () => {
      it('errors if not supplied an array', () => {
        const errors = []
        try {
          new Validator('jsx', 'js', { excludes: true })
        } catch (e) {
          errors.push(e)
        }

        try {
          new Validator('jsx', 'js', { excludes: 'hi' })
        } catch (e) {
          errors.push(e)
        }

        expect(errors[0].message).toEqual('Excludes must be an array')
        expect(errors.length).toEqual(2)
      })

      it('does not set excludes if not supplied', () => {
        const validator = new Validator('jsx', 'js', {})
        expect(validator.exludes).toNotExist()
      })

      it('sets excludes', () => {
        const excludes = ['1', '2', '3']
        const validator = new Validator('jsx', 'js', { excludes })
        expect(validator.excludes).toBe(excludes)
      })
    })

    describe('#_handleOverride', () => {
      it('errors if not supplied an boolean', () => {
        const errors = []
        try {
          new Validator('jsx', 'js', { override: () => 'yo' })
        } catch (e) {
          errors.push(e)
        }

        try {
          new Validator('jsx', 'js', { override: 'false' })
        } catch (e) {
          errors.push(e)
        }

        expect(errors[0].message).toEqual('Override must be a boolean')
        expect(errors.length).toEqual(2)
      })

      it('does not set overide if not supplied', () => {
        const validator = new Validator('jsx', 'js', {})
        expect(validator.overide).toNotExist()
      })

      it('sets excludes', () => {
        const override = true
        const validator = new Validator('jsx', 'js', { override })
        expect(validator.override).toBe(override)
      })
    })

  })
})
