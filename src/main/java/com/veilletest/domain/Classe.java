package com.veilletest.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Classe.
 */
@Entity
@Table(name = "classe")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Classe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "nb_students")
    private Integer nbStudents;

    @Column(name = "teacher")
    private String teacher;

    @OneToMany(mappedBy = "classe")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Student> eleves = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Classe name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getNbStudents() {
        return nbStudents;
    }

    public Classe nbStudents(Integer nbStudents) {
        this.nbStudents = nbStudents;
        return this;
    }

    public void setNbStudents(Integer nbStudents) {
        this.nbStudents = nbStudents;
    }

    public String getTeacher() {
        return teacher;
    }

    public Classe teacher(String teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public Set<Student> getEleves() {
        return eleves;
    }

    public Classe eleves(Set<Student> students) {
        this.eleves = students;
        return this;
    }

    public Classe addEleve(Student student) {
        this.eleves.add(student);
        student.setClasse(this);
        return this;
    }

    public Classe removeEleve(Student student) {
        this.eleves.remove(student);
        student.setClasse(null);
        return this;
    }

    public void setEleves(Set<Student> students) {
        this.eleves = students;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Classe)) {
            return false;
        }
        return id != null && id.equals(((Classe) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Classe{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nbStudents=" + getNbStudents() +
            ", teacher='" + getTeacher() + "'" +
            "}";
    }
}
