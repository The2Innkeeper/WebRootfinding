export class MobiusTransformation {
  constructor(
    public numeratorCoefficient: number,
    public numeratorConstant: number,
    public denominatorCoefficient: number,
    public denominatorConstant: number
  ) {}

  static identity(): MobiusTransformation {
    return new MobiusTransformation(1, 0, 0, 1);
  }

  processUnitInterval(): MobiusTransformation {
    return new MobiusTransformation(
      this.numeratorConstant,
      this.numeratorConstant + this.numeratorCoefficient,
      this.denominatorConstant,
      this.denominatorConstant + this.denominatorCoefficient
    );
  }

  transformedForLowerInterval(shift: number): MobiusTransformation {
    const newA = this.numeratorConstant;
    const newB = this.numeratorConstant + shift * this.numeratorCoefficient;
    const newC = this.denominatorConstant;
    const newD = this.denominatorConstant + shift * this.denominatorCoefficient;

    return new MobiusTransformation(newA, newB, newC, newD);
  }

  evaluateAt(x: number): number {
    const denominator = this.denominatorCoefficient * x + this.denominatorConstant;
    if (Math.abs(denominator) < Number.EPSILON) {
      const numerator = this.numeratorCoefficient * x + this.numeratorConstant;
      if (numerator > 0) return Infinity;
      if (numerator < 0) return -Infinity;
    }
    return (this.numeratorCoefficient * x + this.numeratorConstant) / denominator;
  }

  positiveDomainImage(): Interval {
    if (this.denominatorCoefficient === 0 && this.denominatorConstant === 0) {
      return { leftBound: 0, rightBound: Infinity };
    }
    const bound1 = this.numeratorConstant / this.denominatorConstant;
    const bound2 = this.numeratorCoefficient / this.denominatorCoefficient;

    return {
      leftBound: Math.min(bound1, bound2),
      rightBound: Math.max(bound1, bound2),
    };
  }

  unitIntervalImage(): Interval {
    if (this.denominatorCoefficient === 0 && this.denominatorConstant === 0) {
      return { leftBound: 0, rightBound: Infinity };
    }

    const bound1 = this.numeratorConstant / this.denominatorConstant;
    const bound2 = (this.numeratorCoefficient + this.numeratorConstant) /
      (this.denominatorCoefficient + this.denominatorConstant);

    return {
      leftBound: Math.min(bound1, bound2),
      rightBound: Math.max(bound1, bound2),
    };
  }

  taylorShiftBy1(): MobiusTransformation {
    return new MobiusTransformation(
      this.numeratorCoefficient,
      this.numeratorConstant + this.numeratorCoefficient,
      this.denominatorCoefficient,
      this.denominatorConstant + this.denominatorCoefficient
    );
  }

  taylorShift(shift: number): MobiusTransformation {
    return new MobiusTransformation(
      this.numeratorCoefficient,
      this.numeratorConstant + shift * this.numeratorCoefficient,
      this.denominatorCoefficient,
      this.denominatorConstant + shift * this.denominatorCoefficient
    );
  }

  reciprocalInput(): MobiusTransformation {
    return new MobiusTransformation(
      this.numeratorConstant,
      this.numeratorCoefficient,
      this.denominatorConstant,
      this.denominatorCoefficient
    );
  }

  scaleInput(factor: number): MobiusTransformation {
    return new MobiusTransformation(
      this.numeratorCoefficient * factor,
      this.numeratorConstant,
      this.denominatorCoefficient * factor,
      this.denominatorConstant
    );
  }
}

interface Interval {
  leftBound: number;
  rightBound: number;
}